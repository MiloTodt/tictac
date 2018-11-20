import React, { Component } from 'react'
import Scoreboard from './components/Scoreboard.js'
import Game from './components/Game.js'
import './App.css'

class App extends Component {
  render () {
    return (
      <>
      <head>
          <title>Tic Tac Toe</title>
      </head>
      <body>
        <div>
          <div className='container w3-teal '>
            <div className='card-body'>
              <>
                <h2>Tic-Tac-Toe</h2>
                <Game />
              </>
            </div>
          </div>
        </div>
      </body>
      </>
    )
  }
}

export default App
