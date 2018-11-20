import React, { Component } from "react";
import Scoreboard from "./components/Scoreboard.js";
import Game from "./components/Game.js";
import Popup from "reactjs-popup";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="card container mt-3">
          <div className="card-body">
            <center>
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <>
                    <Game />
                    <Scoreboard />
                  </>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
