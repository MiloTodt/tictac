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
    this.downloadPlayers();
  }
  downloadPlayers() {
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
  createPlayer(name, result) {
    //Create a new player, sending result of their first match
    let wins = 0;
    let losses = 0;
    let draws = 0;

    if (result === "win") {
      wins++;
    } else if (result === "loss") {
      losses++;
    } else if (result === "draw") {
      draws++;
    } else {
      alert("Invalid result passed!");
      return;
    }
    axios
      .post("/api/v1/players", { player: { name, wins, losses, draws } })
      .then(response => {
        console.log(response);
        const players = [...this.state.players, response.data];
        this.setState(state => {
          return { players: players };
        });
      });
  }
  updatePlayer(name, result) {
    const id = this.playerIndex(name);
    if (id === 0) {
      //New player, first create in database
      this.createPlayer(name, result);
    } else {
      const players = this.state.players.slice();
      const player = players[id - 1];
      let wins = player.wins;
      let losses = player.losses;
      let draws = player.draws;
      if (result === "win") {
        wins++;
      } else if (result === "loss") {
        losses++;
      } else if (result === "draw") {
        draws++;
      } else {
        alert("Invalid result passed!");
        return;
      }
      axios
        .put("/api/v1/players/" + id, {
          player: {
            wins,
            losses,
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
    this.updatePlayer("testss8", "loss");
  };

  renderBezos() {
    return (
      <button className="btn btn-primary" onClick={() => this.bezos()}>
        Bezos Wins
      </button>
    );
  }
  playerIndex(name) {
    const index = this.state.players.findIndex(function(player) {
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
