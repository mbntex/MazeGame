import React from 'react';
import RowsList from './rowslist.js';


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gameMode: 'rotateThenMove',
      player: {row: 0, col: 0, attack: {row: 0, col: 1}, direction: 'right', icon: '>', alive: true, weapons: []},
      monster: {row: 7, col: 7, attack: {row: 7, col: 6}, direction: 'left', icon: 'L', alive: true},
      walls: [],
      mazeSize: 8,
      mazeNoGoSquares: [1, 'M'],
      mazeFixed:  [
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0], 
        [0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0]
      ],
      mazeActive:  [
        [, , , , , , , ],
        [, , , , , , , ], 
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ]
      ],
      mazeRender:  [
        [, , , , , , , ],
        [, , , , , , , ], 
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ],
        [, , , , , , , ]
      ]
    };
  }


  componentWillMount () {
    console.log('componentWillMount ran');
    this.buildMazeFN();
    this.timerFn();
  }

  componentDidMount () {
    console.log('componentDidMount ran');
    



    // //setInterval( this.monsterMove, 3000 );
    // var i = 0;
    // setInterval( this.monsterMover.bind(this), 4000);
    // setInterval( this.fireBallMover.bind(this), 1000);
    // setInterval( this.wallAger.bind(this), 1000);
    // // // DEBUGGER CODE
    // // setInterval( ()=>{
    // //     i+=1; 
    // //     // console.log('Debugger I = ', i); 
    // //     if (i > 10) {debugger;}}, 1000
    // //   );
  }

  componentWillUpdate () {
    console.log('componentWillUpdate ran');
  }


  timerFn () {
    setInterval(this.monsterMover.bind(this), 3000);
  }

  buildMazeFN () {
    var mazeFixedInstance = this.state.mazeFixed;

    var arrayMaker = (n) => {
      var output = [];
      for (var i = 0; i < n; i ++) {
        var row = [];
        row.length = n;
        output.push(row);
      }
      return output;
    };

    //PLACE ACTIVE ITEMS IN ACTIVE MAZE FOR RENDERING
    var mazeActiveInstance = arrayMaker(this.state.mazeSize)
    mazeActiveInstance[this.state.player.row][this.state.player.col] = this.state.player.icon;
    mazeActiveInstance[this.state.monster.row][this.state.monster.col] = this.state.monster.icon;

    var mazeRenderInstance = this.state.mazeRender;
    for (var r = 0; r < mazeActiveInstance.length; r++) {
      for (var c = 0; c < mazeActiveInstance[r].length; c++) {
        if(mazeActiveInstance[r][c] === undefined) {
          mazeRenderInstance[r][c] = mazeFixedInstance[r][c];
        } else {
          mazeRenderInstance[r][c] = mazeActiveInstance[r][c];
        }
      }
    }
    this.setState({mazeActive: mazeActiveInstance, mazeRender: mazeRenderInstance});
  }


  playerInputHandlerFn (e) {
    var playerInstance = this.state.player;
    var mazeActiveInstance = this.state.mazeActive;
    


    var attackCloseFn = (char) => {
      console.log('attack close!');
      mazeActiveInstance[char.attack.row][char.attack.col] = 'A';
    }

    var attackWallFn = () => {
      console.log('attack wall!');
    }

     var attackFireballFn = () => {
      console.log('attack!');
    }

    if (e.keyCode === 32) { attackCloseFn(); }
    if (e.keyCode === 87) { attackWallFn(); }
    if (e.keyCode === 70) { attackFireballFn(); }


    // CHARACHTER MOVE FN (KEEP ON TOP OF ROTATION TO HAVE ROTATION THEN MOVE LOGIC. REVERSE TO CHANGE THAT.)
    var characterMoveFn = () => {
      let {direction, row, col} = this.state.player;
      if ((e.keyCode === 37) && (direction === 'left')) {
        if (this.state.mazeFixed[row][col -1] > -1) {
          if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) {
            playerInstance.col -=1;      
          }
        }
      };
      if (e.keyCode === 38 && this.state.player.direction === 'up') {
        if (row - 1 > -1) {
          if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row-1][col ]) === -1) {
              playerInstance.row -=1;    
          }
        }
      };
      if (e.keyCode === 39 && direction === 'right') {
        if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
          if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) {
            playerInstance.col +=1;  
          }
        }; 
      };
      if (e.keyCode === 40 && direction === 'down') {
        if (row + 1 < this.state.mazeSize) {
          if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row+1][col ]) === -1) {
            playerInstance.row +=1;
          }; 
        }
      };
    }


    //CHARACHTER ROTATION FN
    var characterRotationFn = () =>{
      if (e.keyCode === 37 && this.state.player.direction !== 'left') {
        playerInstance.direction = 'left';
        playerInstance.icon = '<';
      };
      if (e.keyCode === 38 && this.state.player.direction !== 'up') {
        playerInstance.direction = 'up';
        playerInstance.icon = '^';
      };
      if (e.keyCode === 39 && this.state.player.direction !== 'right') {
        playerInstance.direction = 'right';
        playerInstance.icon = '>';
      };
      if (e.keyCode === 40 && this.state.player.direction !== 'down') {
        playerInstance.direction = 'down';
        playerInstance.icon = 'V';
      };
    }

    //GAMEMODE LOGIC
    if (this.state.gameMode === 'rotateThenMove') {
      characterMoveFn();
      characterRotationFn();
    }
    if (this.state.gameMode === 'moveThenRotate') {
      characterRotationFn();
      characterMoveFn();
    }

    mazeActiveInstance[this.state.player.row][this.state.player.col] = playerInstance.icon;
    this.findAttackSquare(playerInstance);
    this.setState({player: playerInstance, mazeActive: mazeActiveInstance});
    this.buildMazeFN();  
  }


  monsterMover() {
    let monsterInstance = this.state.monster;
    let {col, row, direction} = monsterInstance;


    var roll = Math.floor(Math.random()*4);
    var monsterMoved = false;
    // MonsterMoveLoopStart :

    // while(monsterMoved === false) {
    var infiniteLoopCatcher = 0;
    infiniteLoopCatcher ++;
    if (infiniteLoopCatcher === 100) {debugger;}

    if (roll === 0) {
      console.log('monster left');
      if (this.state.mazeFixed[row][col -1] > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) {
          monsterInstance.direction = 'left';
          monsterInstance.icon = 'L';  
          monsterInstance.col -=1;   
          monsterMoved = true; 
          // break MonsterMoveLoopStart;   
        }; 
      }
      if (monsterMoved === false) { roll = 1; console.log('MODIFIED')}
    }
    if(roll === 1) {
      console.log('monster up');
      if (row - 1 > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row-1][col ]) === -1) {
          monsterInstance.direction = 'up'; 
          monsterInstance.icon = 'U';
          monsterInstance.row -=1;   
          monsterMoved = true; 
          // break MonsterMoveLoopStart;    
        }
      };
      if (monsterMoved === false) { roll = 2; console.log('MODIFIED') }
    }
    if(roll === 2) {
      console.log('monster right');
      if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) {
          monsterInstance.direction = 'right'; 
          monsterInstance.icon = 'R';
          monsterInstance.col +=1; 
          monsterMoved = true;  
          // break MonsterMoveLoopStart;   
        }
      };
      if (monsterMoved === false) { roll = 3; console.log('MODIFIED')}
    }
    if(roll === 3){
      console.log('monster down');
      if (row + 1 < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row+1][col ]) === -1) {
          monsterInstance.direction = 'down';
          monsterInstance.icon = 'D'; 
          monsterInstance.row +=1;
          monsterMoved = true; 
          // break MonsterMoveLoopStart;    
        }
      };
      // if (monsterMoved === false) { roll = 1; console.log('MODIFIED')};
    }
    // }
    this.findAttackSquare(monsterInstance);
    this.setState({monster: monsterInstance});
    this.buildMazeFN(); 
  }


  findAttackSquare (charachter) {
    let charachterInstance = charachter;
    //let charachterInstance.attack.row = charachter.row;
    //let charachterInstance.attack.col = charachter.col;
    let {row, col, attack} = charachterInstance;
    attack.row = row;
    attack.col = col;
    let attackPossible = false;
    if (charachterInstance.direction === 'left') {
      console.log('looking left');

      if (this.state.mazeFixed[row][col -1] > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) {
          attack.col = col -1;  
          attackPossible = true; 
        }; 
      }

    }
    if (charachterInstance.direction === 'up') {
      console.log('looking up');

      if (row - 1 > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row-1][col ]) === -1) {
          attack.row = row -1;  
          attackPossible = true; 
        }
      };

    }
    if (charachterInstance.direction === 'right') {
      console.log('looking right');

      if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) {
          attack.col = col +1;  
          attackPossible = true;   
        }
      };




    }
    if (charachterInstance.direction === 'down') {
      console.log('looking down');
      if (row + 1 < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row+1][col ]) === -1) {
          attack.row = row +1;  
          attackPossible = true;   
        }
      };



    }
    if (attackPossible === false) {
      console.log('NO ATTACK POSSIBLE');
      attack.row = null; attack.col = null
    }
    console.log('ATTACK LOCATION = ', attack.row, attack.col);
    this.setState({player: charachterInstance});
  }


  makeAttackFn(startRow, startCol, direction) {
    
  }

 
   

  makeWallFn(startRow, startCol, direction) {
    
  }

  wallAger(){
    
  }

  makeFireBallFn(startRow, startCol, direction, oldTile, startingPoint=true) {
    
  }


  fireBallMover(){

  }



  changeGameMode() {
    if (this.state.gameMode === 'rotateThenMove') {
      this.setState({gameMode: 'moveThenRotate'});
    }
    if (this.state.gameMode === 'moveThenRotate') {
      this.setState({gameMode: 'rotateThenMove'});
    }
  }


 
  
  
      


  render() {
    var buttonContent;
    this.state.gameMode === 'rotateThenMove' ? buttonContent = 'Rotate BEFORE Move' :  buttonContent = 'Rotate AND Move';

    return (
      <div>
        <p>Game Here</p>
        <div>
          <RowsList data={this.state.mazeRender}/>
        </div>
        <input id="gameinput" type="text" onKeyDown={this.playerInputHandlerFn.bind(this)}></input>
        <div>
          <button id="rotation" onClick={this.changeGameMode.bind(this)}>{buttonContent}</button>
        </div>
      </div>
    )
  }
}
export default Game;





//////////////////////////////////////////////////////////////////////////////////

/*
import React from 'react';
import RowsList from './rowslist.js';
//import Background from '../terrain.png';
//import css from '../styles.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      current: [1, 2],
      currentMazeLevel: 1,
      lastPlayerMove: '',
      playerCharachter: '<',
      playerAttack: [1, 3],
      fireballs: [],
      walls: [],
      monsterCurrent: [0, 0],
      monsterStatusAlive: true,
      mazeSize: 8,
      maze:  [
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0], 
        [0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        ['T', 'E', 'S', 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 0, 0, 0, 0, 0]
      ]
    };
  }

  timerFn () {
    console.log('Timer went off!')
  }

  componentWillMount () {
    console.log('COMPONENT WILL MOUNT RAN');
    var startRoll = Math.random();
    var currentRow = this.state.current[0];
    var currentCol = this.state.current[1];
    var currentMonsterRow = this.state.monsterCurrent[0];
    var currentMonsterCol = this.state.monsterCurrent[1];
    var newMaze = this.state.maze;
    newMaze[currentRow][currentCol] = '>';
    newMaze[currentMonsterRow][currentMonsterCol] = 'M';
    this.setState({maze: newMaze});
  }

  componentDidMount () {
    //setInterval( this.monsterMove, 3000 );
    var i = 0;
    setInterval( this.monsterMover.bind(this), 4000);
    setInterval( this.fireBallMover.bind(this), 1000);
    setInterval( this.wallAger.bind(this), 1000);
    // // DEBUGGER CODE
    // setInterval( ()=>{
    //     i+=1; 
    //     // console.log('Debugger I = ', i); 
    //     if (i > 10) {debugger;}}, 1000
    //   );
  }

  monsterMove() {
    console.log('what!!');
  }

  monsterMover() {
    var monsterIcon = 'M';
    var currentMonsterRow = this.state.monsterCurrent[0];
    var currentMonsterCol = this.state.monsterCurrent[1];
    var futureMonsterRow = this.state.monsterCurrent[0];
    var futureMonsterCol = this.state.monsterCurrent[1];
    MonsterMoveLoopStart :
    while (1 < 2) {
      var roll = Math.floor(Math.random()*4);
      switch (roll) {
        case 0 : 
          // console.log('monster Rolled left');
          if (this.state.monsterCurrent[1] -1 !== -1) {
              // console.log('monster Moved left');
              futureMonsterCol = this.state.monsterCurrent[1] -1;
              break MonsterMoveLoopStart;
            }
          break;
        case 1 : 
            // console.log('monster Rolled up');
            if (this.state.monsterCurrent[0] -1 !== -1) {
              // console.log('monster Moved up');
              futureMonsterRow = this.state.monsterCurrent[0] -1;
              break MonsterMoveLoopStart;
            }
          break;
        case 2 : 
            // console.log('monster Rolled right');
            if (this.state.monsterCurrent[1] +1 < this.state.mazeSize) {
            // console.log('monster Moved right');
              futureMonsterCol = this.state.monsterCurrent[1] +1;
              break MonsterMoveLoopStart;
            }
          break;
        case 3 : 
            // console.log('monster Rolled down');
            if (this.state.monsterCurrent[0] +1 < this.state.mazeSize) {
              // console.log('monster Moved down');
              futureMonsterRow = this.state.monsterCurrent[0] +1;
              break MonsterMoveLoopStart;
            }
        case roll > 3:
            // console.log('monster rolled special');

          break;
        default:
          console.error('switch default hit, you have an issue in your switch statement');
      }
    }
    var monsterMaze = this.state.maze;
    monsterMaze[currentMonsterRow][currentMonsterCol] = 0;
    monsterMaze[futureMonsterRow][futureMonsterCol] = 'M';
    this.setState({maze: monsterMaze, monsterCurrent: [futureMonsterRow, futureMonsterCol]});
    if (JSON.stringify(this.state.current) === JSON.stringify(this.state.monsterCurrent)) {
      alert('The Monster Got You!');
    }
  }

  makeWallFn(startRow, startCol, direction) {
    var wallList = this.state.walls;
    var originalChar = this.state.maze[startRow][startCol];
    var newWall = {row: startRow, col: startCol, direction: direction, hitpoints: 4, original: originalChar};
    wallList.push(newWall);
    // console.log('wall made ROW =', startRow , 'COL = ', startCol );
  }

   wallAger(){
    // console.log('WALLS LENGTH = ', this.state.walls.length);
    if(this.state.walls.length > 0) {
      var wallMazeMap = this.state.maze;
      var wallList = this.state.walls;
      for (var i=0; i < this.state.walls.length; i++) {
        //wallMazeMap[this.state.fireballs[i][0]][this.state.fireballs[i][0]] = 'F';
        
        wallList[i].hitpoints -= 1;
        if (wallList[i].hitpoints > 2) {
          wallMazeMap[wallList[i].row][wallList[i].col] = 'W';
        }
        if (wallList[i].hitpoints === 1) {
          wallMazeMap[wallList[i].row][wallList[i].col] = 'w';
        }
        if (wallList[i].hitpoints === 0) {
          wallMazeMap[wallList[i].row][wallList[i].col] = wallList[i].original;
        }
      }
      this.setState({maze: wallMazeMap, walls: wallList});
    }
  }

  makeFireBallFn(startRow, startCol, direction, oldTile, startingPoint=true) {
    var fireBallList = this.state.fireballs;
    // var newFireball = [startRow, startCol, direction];
    var newFireball = {row: startRow, col: startCol, direction: direction, oldTile: oldTile, startingPoint: startingPoint};
    if(startRow !== -1 || startRow < this.state.mazeSize || startCol !== undefined) {
      fireBallList.push(newFireball);
      this.setState({fireballs: fireBallList});  
    }
    //console.log('fireball launched');
  }


  fireBallMover(){
    console.log('FIREBALL LENGTH = ', this.state.fireballs.length);
    if(this.state.fireballs.length > 0) {
    var fireballMazeMap = this.state.maze;
    var tempFireBallArray = this.state.fireballs;
      for (var i=0; i < tempFireBallArray.length; i++) {
        //FIREBALL MOVING LEFT
        if(tempFireBallArray[i].direction ==='left' && fireballMazeMap[tempFireBallArray[i].row]) {
          if (fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] !== undefined) {
            if (tempFireBallArray[i].startingPoint === true) {
              tempFireBallArray[i].oldTile = fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col];
              fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] = 'X';
            } else {
              fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col +1] = tempFireBallArray[i].oldTile;
              tempFireBallArray[i].oldTile = fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col];
              fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] = 'X';
            }
            tempFireBallArray[i].startingPoint = false;
            tempFireBallArray[i].col -= 1;
          } else {
            fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col + 1] = tempFireBallArray[i].oldTile;
            tempFireBallArray.splice(i, 1);
            break;
          }   
        }
        
        // // FIREBALL MOVING UP
        // if(tempFireBallArray[i].direction ==='up' && fireballMazeMap[tempFireBallArray[i].col]) {
        //   if (tempFireBallArray[i].direction ==='up' &&tempFireBallArray[i].row >= -1) {
        //     if (tempFireBallArray[i].startingPoint === true) {
        //       tempFireBallArray[i].oldTile = fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col];
        //       fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] = 'X';
        //     } else {
        //       fireballMazeMap[tempFireBallArray[i].row +1][tempFireBallArray[i].col] = tempFireBallArray[i].oldTile;
        //       tempFireBallArray[i].oldTile = fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col];
        //       fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] = 'X';
        //     }
        //     tempFireBallArray[i].startingPoint = false;
        //     tempFireBallArray[i].row -= 1;
        //   } else {
        //     console.log('UIUIUIU');
        //     fireballMazeMap[tempFireBallArray[i].row -1][tempFireBallArray[i].col] = tempFireBallArray[i].oldTile;
        //     tempFireBallArray.splice(i, 1);
        //     break
        //   }   
        // }

        //FIREBALL MOVING RIGHT
        if(tempFireBallArray[i].direction ==='right' && fireballMazeMap[tempFireBallArray[i].row]) {
          if (fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] !== undefined) {
            if (tempFireBallArray[i].startingPoint === true) {
              tempFireBallArray[i].oldTile = fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col];
              fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] = 'X';
            } else {
              fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col -1] = tempFireBallArray[i].oldTile;
              tempFireBallArray[i].oldTile = fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col];
              fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col] = 'X';
            }
            tempFireBallArray[i].startingPoint = false;
            tempFireBallArray[i].col += 1;
          } else {
            fireballMazeMap[tempFireBallArray[i].row][tempFireBallArray[i].col - 1] = tempFireBallArray[i].oldTile;
            tempFireBallArray.splice(i, 1);
            break
          }   
        }






      }
      this.setState({fireballs: tempFireBallArray, maze: fireballMazeMap});
    }
  }



  attackHandlerFn (e) {
    var context = this;
    var charachter = this.state.playerCharachter;

    if (e.keyCode === 87 ||
        e.keyCode === 32 ||
        e.keyCode === 70 ||
        e.keyCode === 37 ||
        e.keyCode === 38 || 
        e.keyCode === 39 || 
        e.keyCode === 40  ) {
      
      var currentRow = this.state.current[0];
      var currentCol = this.state.current[1];

      var futureRow = this.state.current[0];
      var futureCol = this.state.current[1];

      
      //LOGIC TO TURN CHARACHTER
      if (e.keyCode === 37) { 
        //console.log('left');
        if (this.state.current[1] -1 !== undefined) {
          futureCol = this.state.current[1] -1;
        }
        this.setState({lastPlayerMove: 'left', playerCharachter: '<'});
        charachter = '<';  
      }

      if (e.keyCode === 38) { 
        // console.log('up');
        if (this.state.current[0] -1 > -1) {
          futureRow = this.state.current[0] -1;
        }
        this.setState({lastPlayerMove: 'up', playerCharachter: '^'});
        charachter = '^';    
      }

      if (e.keyCode === 39) { 
        // console.log('right');
        if (this.state.current[1] +1 !== undefined) {
          futureCol = this.state.current[1] +1;
        }
        this.setState({lastPlayerMove: 'right', playerCharachter: '>'});
        charachter = '>'; 
      }

      if (e.keyCode === 40 ) { 
        // console.log('down');
        if (this.state.current[0] +1 < this.state.mazeSize) {
          futureRow = this.state.current[0] +1;
        }  
        this.setState({lastPlayerMove: 'down', playerCharachter: 'V'});
        charachter = 'V'; 
      }

      //ATTACK LOGIC BOMB
      if (e.keyCode === 32) {
        var attackRow = this.state.current[0];
        var attackCol = this.state.current[1];
        if (this.state.lastPlayerMove === 'left') {attackCol = this.state.current[1] -1;}
        if (this.state.lastPlayerMove === 'up') {attackRow = this.state.current[0] -1;}
        if (this.state.lastPlayerMove === 'right') {attackCol = this.state.current[1] +1;}
        if (this.state.lastPlayerMove === 'down') {attackRow = this.state.current[0] +1;}
        this.setState({playerAttack: [attackRow, attackCol]});
        var placeAttacked = [attackRow, attackCol];
        var attackMaze = this.state.maze;
        if (attackMaze[attackRow][attackCol] !== undefined) {
          var attackMazeOld = attackMaze[attackRow][attackCol];
          attackMaze[attackRow][attackCol] = 'A';
          if (JSON.stringify(placeAttacked) === JSON.stringify(this.state.monsterCurrent)) {
          alert('You Win!');
          } 
          setTimeout( ()=>{attackMaze[attackRow][attackCol] = attackMazeOld}, 1000 )
          this.setState({maze: attackMaze});
        }
      }

      //ATTACK LOGIC SWORD
      if (e.keyCode === 70) {
        var fireballRow = this.state.current[0];
        var fireballCol = this.state.current[1];
        if (this.state.lastPlayerMove === 'left') {fireballCol = this.state.current[1] -1;}
        if (this.state.lastPlayerMove === 'up') {fireballRow = this.state.current[0] -1;}
        if (this.state.lastPlayerMove === 'right') {fireballCol = this.state.current[1] +1;}
        if (this.state.lastPlayerMove === 'down') {fireballRow = this.state.current[0] +1;}
        this.makeFireBallFn(fireballRow, fireballCol, this.state.lastPlayerMove, this.state.maze[fireballRow][fireballCol]);
      }

      //ATTACK LOGIC WALL
      if (e.keyCode === 87) {
        var wallRow = this.state.current[0];
        var wallCol = this.state.current[1];
        if (this.state.lastPlayerMove === 'left') {wallCol = this.state.current[1] -1;}
        if (this.state.lastPlayerMove === 'up') {wallRow = this.state.current[0] -1;}
        if (this.state.lastPlayerMove === 'right') {wallCol = this.state.current[1] +1;}
        if (this.state.lastPlayerMove === 'down') {wallRow = this.state.current[0] +1;}
        if ((wallRow > -1 && wallRow < this.state.mazeSize) && (wallCol > -1 && wallCol < this.state.mazeSize)) {
          this.makeWallFn(wallRow, wallCol, this.state.lastPlayerMove);
        }
      }

      //LOGIC TO MOVE CHARACHTER & WIN & LOSS SCENARIOS
      if (this.state.maze[futureRow][futureCol] === 0 || this.state.maze[futureRow][futureCol] === 'M') {
        console.log('MOVE!!!! TO ', this.state.maze[futureRow][futureCol]);
        var newMaze = this.state.maze;
        newMaze[currentRow][currentCol] = 0;
        newMaze[futureRow][futureCol] = charachter;
        this.setState({current: [futureRow, futureCol], maze: newMaze, playerAttack:[attackRow, attackCol]});
        if (JSON.stringify(this.state.current) === JSON.stringify(this.state.monsterCurrent)) {
          alert('The Monster Got You!');
        }   
      } else {
        console.log('TURN!!!! TO ', this.state.maze[futureRow][futureCol]);
        var newMaze = this.state.maze;
        newMaze[currentRow][currentCol] = charachter;
        this.setState({playerAttack:[attackRow, attackCol]});
        if (JSON.stringify(this.state.current) === JSON.stringify(this.state.monsterCurrent)) {
          alert('The Monster Got You!');
        }   
      }
    }
  }

 
  
  
      

//document.addEventListener('click', this.handleClick, false);

  render() {
    // setInterval((()=>{console.log('gogogogogo!')}), 3000);
    //var Background = test123
    // var testSquare = {
    //   //backgroundColor: 'red',
    //   backgroundImage: `url(${Background})`,
    //   width: '30px',
    //   height: '30px'

    // }




    return (
      <div>
      
        <p>Game Here</p>
        <div>
          <RowsList data={this.state.maze}/>
        </div>
        <input id="gameinput" type="text" onKeyDown={this.attackHandlerFn.bind(this)}></input>
      </div>
    )
  }
}
export default Game;


*/

