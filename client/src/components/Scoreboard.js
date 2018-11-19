import React from "react";

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.getScores();
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

  getScores = async () => {
    const api_call = await fetch("http://localhost:3001/api/v1/players");

    const data = await api_call.json();

    this.setState({
      players: data
    });
  };

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
            <tr>
              <td> {obj.name} </td>
              <td> {obj.wins} </td>
              <td> {obj.losses} </td>
              <td> {obj.draws} </td>
            </tr>
          ))}
        </table>
      </>
    );
  }
}

export default Scoreboard;
