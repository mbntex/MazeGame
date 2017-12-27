import React from 'react';

var SpecificRow = (props) => {
  // var mazeRemade = props.info;
  // var renderDivsFn = function(grid){
  //   for (var i = 0; i < grid.length; i++) {
  //     for (var j = 0; j < grid[i].length; j++) {
  //       if (1 === 1) {
  //         console.log('hit!!!!!!');
  //       }
  //     }
  //   }
  // }

  // // renderDivsFn(props.info);
  // var mazeWallFirst = {
  //   backgroundColor: 'brown',
  
  //   width: '30px',
  //   height: '30px'
  // };
  // var mazePathFirst = {
  //   backgroundColor: 'grey',
  
  //   width: '30px',
  //   height: '30px'
  // };
  // var mazeMonsterFirst = {
  //   backgroundColor: 'blue',
 
  //   width: '30px',
  //   height: '30px'
  // };
  // var heroChrachterFirst = {
  //   backgroundColor: 'brown',
  
  //   width: '30px',
  //   height: '30px'
  // };



  // var mazeWall = {
  //   backgroundColor: 'brown',
  //   float: 'left',
  //   width: '30px',
  //   height: '30px'
  // };
  // var mazePath = {
  //   backgroundColor: 'grey',
  //   float: 'left',
  //   width: '30px',
  //   height: '30px'
  // };
  // var mazeMonster = {
  //   backgroundColor: 'blue',
  //   float: 'left',
  //   width: '30px',
  //   height: '30px'
  // };
  // var heroChrachter = {
  //   backgroundColor: 'brown',
  //   float: 'left',
  //   width: '30px',
  //   height: '30px'
  // };


//////
// var testSquare = {
//       backgroundColor: 'red',
//       // backgroundImage: `url(${Background})`,
//       width: '30px',
//       height: '30px'

//     }



//////


  // var testFn = (grid, key) => {
  //   var rowBeingMade = [];
  //   for (var i = 0; i < grid.length; i++) {
  //     //console.log('loop ran', i);
  //     if (grid[i] === 0 && i ===0 ) {
  //       grid[i] = <div style={mazePathFirst} key={key}></div>
  //     }
  //     if (grid[i] === 1 && i === 0 ) {
  //       grid[i] = <div style={mazeWallFirst} key={key}></div>
  //     }
  //     if (grid[i] === 'M' && i === 0 ) {
  //       grid[i] = <div style={mazeMonsterFirst} key={key}></div>
  //     }
  //     if (grid[i] === '<' && i === 0 ) {
  //       grid[i] = <div style={heroChrachterFirst} key={key}></div>
  //     }
  //     if (grid[i] === '^' && i === 0 ) {
  //       grid[i] = <div style={heroChrachterFirst} key={key}></div>
  //     }
  //     if (grid[i] === '>' && i === 0 ) {
  //       grid[i] = <div style={heroChrachterFirst} key={key}></div>
  //     }
  //     if (grid[i] === 'V' && i === 0 ) {
  //       grid[i] = <div style={heroChrachterFirst} key={key}></div>
  //     }


  //     if (grid[i] === 0 && i !==0 ) {
  //       grid[i] = <div style={mazePath} key={key}></div>
  //     }
  //     if (grid[i] === 1 && i !==0 ) {
  //       grid[i] = <div style={mazeWall} key={key}></div>
  //     }
  //     if (grid[i] === 'M' && i !==0 ) {
  //       grid[i] = <div style={mazeMonster} key={key}></div>
  //     }
  //     if (grid[i] === '<' && i !==0 ) {
  //       grid[i] = <div style={heroChrachter} key={key}></div>
  //     }
  //     if (grid[i] === '^' && i !==0 ) {
  //       grid[i] = <div style={heroChrachter} key={key}></div>
  //     }
  //     if (grid[i] === '>' && i !==0 ) {
  //       grid[i] = <div style={heroChrachter} key={key}></div>
  //     }
  //     if (grid[i] === 'V' && i !==0 ) {
  //       grid[i] = <div style={heroChrachter} key={key}></div>
  //     }

  //     rowBeingMade.push(grid[i]);
  //   }
  //   return rowBeingMade;
  // }
  
  // var rowMade = testFn(props.info, props.key);

  // var hello = function () {
  //   console.log('hhiiihihiihihihiii');
  // }
  // hello();


  return (
  <div className="row">
    {props.info}
  </div>

  )
}


export default SpecificRow;