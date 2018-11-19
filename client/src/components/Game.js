import React from "react";
import Popup from "reactjs-popup";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    //Left to right
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Up to down
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

function playersSet(player1, player2) {
  return player1 !== "" && player2 !== "";
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const firstTurn = Math.random() < 0.5; //Randomizes who goes first
    this.state = {
      squares: Array(9).fill(null),
      xTurn: firstTurn,
      player_one: "",
      player_two: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      // ignore click if square set or winner has been declared
      return;
    }
    if (!playersSet(this.state.player_one, this.state.player_two)) {
      //Ignore click if player names aren't set.
      return;
    }
    squares[i] = this.state.xTurn ? "X" : "O";
    this.setState({
      squares: squares,
      xTurn: !this.state.xTurn //toggle who's turn it is
    });
  }
  handleSubmit(event) {
    this.setState({
      player_one: event.target.player_one.value,
      player_two: event.target.player_two.value
    });
    event.preventDefault();
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  resetBoard = () => {
    const squares = Array(9).fill(null);
    const firstTurn = Math.random() < 0.5;
    this.setState({
      squares: squares,
      xTurn: firstTurn
    });
  };

  renderResetBoard() {
    return (
      <button className="btn btn-primary" onClick={() => this.resetBoard()}>
        New Game
      </button>
    );
  }

  sendScore = async (winner, result) => {
    const api_call = await fetch("http://localhost:3001/api/v1/players", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: winner,
        result: result
      })
    });

    const data = await api_call.json();

    this.setState({
      players: data
    });
  };

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    const player_one = this.state.player_one;
    const player_two = this.state.player_two;
    const arePlayersSet = playersSet(player_one, player_two);

    const board_full = this.state.squares.findIndex(function(el) {
      return el === null;
    });

    if (winner === "O") {
      status = "Winner: " + player_one;
      this.sendScore(player_one, "win");
      this.sendScore(player_two, "loss");
    } else if (winner === "X") {
      status = "Winner: " + player_two;
      this.sendScore(player_two, "win");
      this.sendScore(player_one, "loss");
    } else if (!arePlayersSet) {
      status = "";
    } else if (board_full === -1) {
      status = "The game is a draw!";
      this.sendScore(player_two, "draw");
      this.sendScore(player_one, "draw");
    } else if (this.state.xTurn == 0) {
      status = player_one + "'s turn!";
    } else {
      status = player_two + "'s turn!";
    }

    let players;
    if (arePlayersSet) {
      players = player_one + " Vs. " + player_two;
    } else {
      players = "Set the names of both players before starting";
    }

    return (
      <>
        <center>
          <div>
            <div className="players"> {players} </div>
            <div className="status"> {status} </div>
            <div className="board-row">
              {this.renderSquare(0)} {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)} {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)} {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
          {this.renderResetBoard()} {/* New game button */}
          {/* Set Player names popup */}
          <Popup
            trigger={() => (
              <button className="btn btn-primary"> Set Names</button>
            )}
          >
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Player One
                  <input type="text" name="player_one" />
                  Player Two
                  <input type="text" name="player_two" />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </Popup>
        </center>
      </>
    );
  }
}

class Game extends React.Component {
  _state = {};
  render() {
    return (
      <>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
        <br />
      </>
    );
  }
}

export default Game;
