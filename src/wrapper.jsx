import React from 'react';
import App from './App.jsx';

 

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {};
  }


  helpFn() {
  window.alert(
      '+ Use the arrow keys on your keypad or the buttons on the screen to move.\n + You can select the mode whether you want to automatically turn and move or to have turning separate from moving.\n+ Attacks: You can attack a monster next to you with the space bar.\n + Attacks: You can build a temporary wall with the \'W\' key.\n+ Attacks: If you have gotten the wand, you can shoot energy balls with the \'E\' key.\n+ You can go to the next level using the stairs.\n'
  ); 
 }
  
      


 
  render() {
    return (
      <div>
      <button className="help-button" onClick={this.helpFn.bind(this)}>?</button>
        <App />
      </div>
    )
  }
}
export default Wrapper;