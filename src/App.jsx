import React from 'react';
import Game from './game.jsx'
 

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
 
  render() {
    // var gameStyle = {backgroundColor:'black', color: 'white', width: '100%', margin: '0 auto'};
    // var titleStyle = {color: 'lightblue', fontSize: '48px', padding: '5px', width: '100%', textAlign: 'center'};
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