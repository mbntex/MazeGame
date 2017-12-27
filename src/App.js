import React from 'react';
import Game from './game.js'


class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
 
  render() {
    return (
      <div>
        <p>Monster Maze</p>
        <Game /> 
      </div>
    )
  }
}
export default App;