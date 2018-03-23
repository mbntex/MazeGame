import React from 'react';
import Game from './game.jsx'
 

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
 
  render() {
    return (
      <div>
        <div className="row-container-center-style">
          <p id="game-title">Monster Maze</p>
        </div>
        <div className="row-container-center-style">
          <Game /> 
        </div>
      </div>
    )
  }
}
export default App;