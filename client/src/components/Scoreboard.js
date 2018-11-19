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
    axios.get('http://localhost:3001/api/v1/players.json')
      .then(response => {
        console.log(response)
        this.setState({
          players: response.data
        })
      })
      .catch(error => console.log(error))
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
