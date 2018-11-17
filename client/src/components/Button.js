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
                                    Test Call!
                </button>
                                <br />
                            </center>
                            <p className="m-5">
                                {this.state.results.map(obj => <li>{obj.name}</li>)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Button;