import React, { Component } from "react";

class Button extends Component {
  state = {
    results: []
  };

  callApi = async () => {
    const api_call = await fetch("http://localhost:3001/api/v1/players");

    const data = await api_call.json();

    this.setState({
      results: data
    });
  };

  render() {
    return (
      <div>
        <div className="card container mt-3">
          <div className="card-body">
            <div className="row">
              <center>
                <button className="btn btn-primary" onClick={this.callApi}>
                  Load players
                </button>
              </center>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
