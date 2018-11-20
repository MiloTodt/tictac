import React, { Component } from 'react'
import Game from './components/Game.js'
import './App.css'

class App extends Component {
  render () {
    return (
      <>
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
