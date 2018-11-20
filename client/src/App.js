import React, { Component } from "react";
import Scoreboard from "./components/Scoreboard.js";
import Game from "./components/Game.js";
import Popup from "reactjs-popup";
import "./App.css";

class App extends Component {
  render() {
    return (
      <body>
        <div>
          <div className="container w3-teal ">
            <div className="card-body">
              <>
                <Game />
                <Scoreboard />
              </>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
