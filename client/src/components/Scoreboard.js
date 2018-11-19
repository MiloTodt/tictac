import React from "react";

class Button extends React.Component {
  _state = {
    results: []
  };
  get state() {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }

  callApi = async () => {
    const api_call = await fetch("http://localhost:3001/api/v1/players");

    const data = await api_call.json();

    this.setState({
      results: data
    });
  };

  render() {
    return (
      <>
        <button className="btn btn-primary" onClick={this.callApi}>
          Load players
        </button>
        <br />
        <table className="blueTable">
          <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
          {this.state.results.map(obj => (
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

export default Button;
