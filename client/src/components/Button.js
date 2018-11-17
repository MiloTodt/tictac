import React from "react";

class Button extends React.Component {
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
            <div className="col-md-8 offset-md-2">
              <center>
                <button className="btn btn-primary" onClick={this.callApi}>
                  Load players
                </button>
              </center>
              <br/>
              <center>
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
              < /center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
