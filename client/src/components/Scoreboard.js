import React from "react";
import axios from "axios";

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }
  _state = {
    players: []
  };
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }
  componentDidMount() {
    axios
      .get("/api/v1/players.json")
      .then(response => {
        console.log(response);
        this.setState({
          players: response.data
        });
      })
      .catch(error => console.log(error));
  }
  updatePlayer(id, result) {
    const players = this.state.players;
    const player = players[id - 1];
    const name = player.name;
    let wins = player.wins;
    let losses = player.losses;
    let draws = player.draws;
    if (result === "win") {
      wins = wins + 1;
      axios
        .put("/api/v1/players/" + id, {
          player: {
            wins
          }
        })
        .then(response => {
          console.log(response);
          players[id - 1] = { id, name, wins, losses, draws };
          this.setState(() => ({
            players,
            editingPlayerId: null
          }));
        })
        .catch(error => console.log(error));
    } else if (result === "loss") {
      losses = losses + 1;
      axios
        .put("/api/v1/players/" + id, {
          player: {
            losses
          }
        })
        .then(response => {
          console.log(response);
          players[id - 1] = { id, name, wins, losses, draws };
          this.setState(() => ({
            players,
            editingPlayerId: null
          }));
        })
        .catch(error => console.log(error));
    } else if (result === "draw") {
      draws = draws + 1;
      axios
        .put("/api/v1/players/" + id, {
          player: {
            draws
          }
        })
        .then(response => {
          console.log(response);
          players[id - 1] = { id, name, wins, losses, draws };
          this.setState(() => ({
            players,
            editingPlayerId: null
          }));
        })
        .catch(error => console.log(error));
    }
  }

  bezos = () => {
    const index = this.playerIndex("Jeff Bezos")
    this.updatePlayer(index, "win");
  };

  renderBezos() {
    return (
      <button className="btn btn-primary" onClick={() => this.bezos()}>
        Bezos Wins
      </button>
    );
  }
  playerIndex(name){
    const index = this.state.players.findIndex(function(player){
      return player.name === name;
    });
    return index + 1;
  }

  render() {
    return (
      <>
        <h1>Scoreboard</h1>
        <table className="blueTable">
          <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
          {this.state.players.map(obj => (
            <tr key={obj.id}>
              <td> {obj.name} </td>
              <td> {obj.wins} </td>
              <td> {obj.losses} </td>
              <td> {obj.draws} </td>
            </tr>
          ))}
        </table>
        {this.renderBezos()}
      </>
    );
  }
}

export default Scoreboard;
