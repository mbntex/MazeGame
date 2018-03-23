

//background span images
//speed up monster moves
// maze level and exit 
// recursive hero search function


import React from 'react';
import RowsList from './rowslist.jsx';
import Levels from './level.jsx';


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gameEnded: false,
      gameMode: 'rotateThenMove',
      player: {row: 0, col: 0, attack: {row: 0, col: 1, closeAttackHappening: false, wallBuilds: []}, direction: 'right', icon: '>', alive: true, weapons: [], playerHealth: 2},
      monster: {row: 8, col: 7, attack: {row: 8, col: 6}, direction: 'left', icon: 'L', monsterHealth: 2, alive: true},
      fireballs: [],
      mazeSize: 12,
      mazeWandLocation: {row: 4, col: 9, pickedUp: false},
      mazeNoGoSquares: [1, 'W', 'w'],
      gameAttackTypes: ['A', 'F'],
      mazeFixed:  Levels.level1F,
      mazeActive:  Levels.level1A,
      mazeRender:  Levels.level1R
    };
  }


  componentWillMount () {
    // STOP ARROWS FROM SCROLLING SCREEN DURING USE
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    //console.log('componentWillMount ran');
    document.addEventListener("keydown", this.playerInputHandlerFn.bind(this));
    document.addEventListener("onMouseUp", this.playerInputHandlerFn.bind(this));
    this.buildMazeFN();
    this.timerFn();
  }

  componentDidMount () {
    //console.log('componentDidMount ran');
    
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
  }
 
  timerFn () {
    setInterval(this.monsterMover.bind(this), 1000);
    setInterval(this.wallReducer.bind(this), 1500);
    setInterval(this.fireballMoverFn.bind(this), 500);
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
    //'A' ATTACK
    if (this.state.player.attack.closeAttackHappening === true) { mazeActiveInstance[this.state.player.attack.row][this.state.player.attack.col] = 'A'; this.attackChecker() };
    //'W' WALLS
    if (this.state.player.attack.wallBuilds.length > 0) { 
      for (var wallBuildsNumber = 0; wallBuildsNumber < this.state.player.attack.wallBuilds.length; wallBuildsNumber++) {
        var currentExistingWall = this.state.player.attack.wallBuilds[wallBuildsNumber];

        if (currentExistingWall.wallHitPoints > 2) {
          mazeActiveInstance[currentExistingWall.row][currentExistingWall.col] = 'W';
        }
        if (currentExistingWall.wallHitPoints <=2 && currentExistingWall.wallHitPoints > 0 ) {
          mazeActiveInstance[currentExistingWall.row][currentExistingWall.col] = 'w';
        }
      }
    };
    //'F' FIREBALLS
    for (var f = 0; f < this.state.fireballs.length; f++) {
      mazeActiveInstance[this.state.fireballs[f].row][this.state.fireballs[f].col] = 'F';
    }
    //'/' WAND
    if (this.state.mazeWandLocation.pickedUp === false) {
      mazeActiveInstance[this.state.mazeWandLocation.row][this.state.mazeWandLocation.col] = '/';
    }
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

  attackChecker () {
    //SAME SPACE CHECK
    let {row, col} = this.state.player;
    let playerLocation = [this.state.player.row, this.state.player.col];
    let monsterLocation = [this.state.monster.row, this.state.monster.col];
    let playerCheckerInstance = this.state.player;
    let monsterCheckerInstance = this.state.monster;
    if (JSON.stringify(playerLocation) === JSON.stringify(monsterLocation)) {
      console.log('HIT SPACE!!!!'); 
      playerCheckerInstance.playerHealth -=2;
      this.setState({player: playerCheckerInstance});
    }
    //FIREBALL CHECK
    for (var f = 0; f < this.state.fireballs.length; f++) {
      if (JSON.stringify(monsterLocation) === JSON.stringify([this.state.fireballs[f].row, this.state.fireballs[f].col]) ) {
        console.log('FIREBALL HIT!!!');
        monsterCheckerInstance.monsterHealth -=2;
        this.setState({monster: monsterCheckerInstance});
      }
    }
    //CLOSE ATTACK CHECK
    if (this.state.player.attack.closeAttackHappening === true && this.state.monster.row === this.state.player.attack.row && this.state.monster.col === this.state.player.attack.col) {
      console.log('CLOSE ATTACK HIT!!!');
      var monsterCloseUpAttackInstance = this.state.monster;
      monsterCloseUpAttackInstance.monsterHealth -=4;
    }


    var gameEnded = false;
    if (this.state.monster.monsterHealth <= 0 && this.state.gameEnded === false) {
      this.setState({mazeFixed: Levels.levelPlayerWinsF, mazeActive: Levels.levelPlayerWinsA, mazeRender: Levels.levelPlayerWinsR});

      //alert('Monster Dead!');
      this.setState({gameEnded: true});
    }
    if (this.state.player.playerHealth <= 0 && this.state.gameEnded === false) {
      //alert('Hero Dead!');
      //this.monsterWinsGame();
      this.setState({mazeFixed: Levels.levelMonsterWinsF, mazeActive: Levels.levelMonsterWinsA, mazeRender: Levels.levelMonsterWinsR});
      this.setState({gameEnded: true});
    }
  }

  wallReducer () {
    // console.log('WALLS = ', this.state.player.attack.wallBuilds);
    var playerInstance = this.state.player;
    for (var w = 0; w < playerInstance.attack.wallBuilds.length; w++) {
      playerInstance.attack.wallBuilds[w].wallHitPoints -= 1;
      //if (playerInstance.attack.wallBuilds[w].wallHitPoints === 0) { console.log ('A WALL HERE HAS ZERO HP!!!')}
      if (playerInstance.attack.wallBuilds[0].wallHitPoints <= 0) { playerInstance.attack.wallBuilds.shift() } 
    }
    this.setState({player: playerInstance});
  }



  fireballMoverFn () {
    // console.log('fireball mover FN happened!', this.state.fireballs);
    var fireballsListInstance = this.state.fireballs;
    for (var f = 0; f < fireballsListInstance.length; f++) {
      fireballsListInstance[f].moved = false;
      if (fireballsListInstance[f].direction === 'up' && fireballsListInstance[f].row -1 >=0 ) { 
        fireballsListInstance[f].row -= 1;
        fireballsListInstance[f].moved = true;
      };
      if (fireballsListInstance[f].direction === 'down' && fireballsListInstance[f].row < this.state.mazeSize -1 ) { 
        fireballsListInstance[f].row += 1;
        fireballsListInstance[f].moved = true;
      };
      if (fireballsListInstance[f].direction === 'left' && fireballsListInstance[f].col -1 >= 0 ) { 
        fireballsListInstance[f].col -= 1;
        fireballsListInstance[f].moved = true;
      };
      if (fireballsListInstance[f].direction === 'right' && fireballsListInstance[f].col < this.state.mazeSize -1 ) { 
        fireballsListInstance[f].col += 1;
        fireballsListInstance[f].moved = true;
      };
    }
     for (var ff = 0; ff < fireballsListInstance.length; ff++) {
      if (fireballsListInstance[ff].moved === false) {
        fireballsListInstance.splice(ff, 1);
      }
     }

    this.setState({fireballs: fireballsListInstance});
    this.buildMazeFN();
    this.attackChecker();
  }

/*HANDLES ALL INPUTS NOTE FUNCTIONS ARE VARIABLES INSIDE OF THIS*/
  playerInputHandlerFn (e) {
    var playerInstance = this.state.player;
    var mazeActiveInstance = this.state.mazeActive;
    var mazeRenderInstance = this.state.mazeRender;
    




    var attackCloseFn = (char) => {
      // console.log('attack close!');
      var charInstance = char;
      if (charInstance.attack.row !== null && charInstance.attack.col !== null ) {
        console.log('TESTTEST NOT NULL HAPPENED!!');
      charInstance.attack.closeAttackHappening = true;
      this.setState({player: charInstance});
      this.attackChecker();
      setTimeout(()=>{ 
        charInstance.attack.closeAttackHappening = false;
        this.setState({player: charInstance});
        this.buildMazeFN();
      }, 500);
      // char.attack.closeAttackHappening = !char.attack.closeAttackHappening;
      // console.log('char attacking  COL = ', char.attack.col, ' ROW = ', char.attack.row);
      this.buildMazeFN(); 
      this.attackChecker();
      }
    }


    var attackWallFn = (char) => {
      console.log('attack wall!');
      var charInstance = this.state.player;
      if (charInstance.attack.row !== null && charInstance.attack.col !== null ) {
        //console.log('TESTTEST NOT NULL HAPPENED!!');
        var currentWall = {row: charInstance.attack.row, col: charInstance.attack.col, wallHitPoints: 4};
        charInstance.attack.wallBuilds.push(currentWall);
        this.setState({player: charInstance});
      }
    }


    var attackFireballFn = (char) => {
      console.log('fireball attack!');
      var fireballsInstance = this.state.fireballs;
      if (this.state.player.attack.row !== null && this.state.player.attack.col !== null ) {
        var currentFireball = {row: this.state.player.attack.row, col: this.state.player.attack.col, direction: this.state.player.direction, moved: true};
        fireballsInstance.push(currentFireball);
        this.setState({fireballs: fireballsInstance})
      }
    }

    var nextMazeLevel = () => {
      console.log('NEXT MAZE LEVEL!');
      this.setState({mazeFixed: Levels.level2F, mazeActive: Levels.level2A, mazeRender: Levels.level2R});
    }

    var monsterWinsGame = () => {
      this.setState({mazeFixed: Levels.levelMonserWinsF, mazeActive: Levels.levelMonserWinsA, mazeRender: Levels.levelMonserWinsR});
    }


    /*TOUCH BUTTONS PART 1*/ 
    if(e.target.id === "attack-button--close") {
      e.keyCode = 65;
    }
    if(e.target.id === "attack-button--wall") {
      e.keyCode = 87;
    }
    if(e.target.id === "attack-button--energy") {
      e.keyCode = 69;
    }


    if (e.keyCode === 65) { attackCloseFn(this.state.player); }
    if (e.keyCode === 87) { attackWallFn(this.state.player); }
    if (e.keyCode === 69 && this.state.player.weapons.indexOf('firewand') !== -1 ) { attackFireballFn(this.state.player); }

    // if (e.target.id === 'attack-button--close') { attackCloseFn(this.state.player); }
    // if (e.target.id === 'attack-button--wall') { attackWallFn(this.state.player); }

    
    // CHARACHTER MOVE FN (KEEP ON TOP OF ROTATION TO HAVE ROTATION THEN MOVE LOGIC. REVERSE TO CHANGE THAT.)
    var characterMoveFn = () => {
      let {direction, row, col} = this.state.player;
      if (this.state.player.attack.closeAttackHappening === false) {

        /*TOUCH BUTTONS PART 2*/ 
        if(e.target.id === "touch-btn-up") {
          e.keyCode = 38;
        }
        if(e.target.id === "touch-btn-down") {
          e.keyCode = 40;
        }
        if(e.target.id === "touch-btn-left") {
          e.keyCode = 37;
        }
        if(e.target.id === "touch-btn-right") {
          e.keyCode = 39;
        }
        
        


        /*KEY MOVEMENT HANDLER*/
        if ((e.keyCode === 37) && (direction === 'left')) {
          if (this.state.mazeFixed[row][col -1] > -1) {
            if (this.state.mazeFixed[row][col -1] === 3)  { nextMazeLevel() } 
            if (
              (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) && 
              (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row][col -1]) === -1)
            ) {
              playerInstance.col -=1;      
            }
          }
        };
        if (e.keyCode === 38 && this.state.player.direction === 'up') {
          if (row - 1 > -1) {
            if (this.state.mazeFixed[row -1][col] === 3)  { nextMazeLevel() } 
            if (
              (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row -1][col]) === -1) &&
              (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row -1][col]) === -1)
            ) {
                playerInstance.row -=1;    
            }
          }
        };
        if (e.keyCode === 39 && direction === 'right') {
          if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
            if (this.state.mazeFixed[row][col +1] === 3)  { nextMazeLevel() } 
            if (
              (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) && 
              (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row][col +1]) === -1)
            ) {
              playerInstance.col +=1;  
            }
          }; 
        };
        if (e.keyCode === 40 && direction === 'down') {
          if (row + 1 < this.state.mazeSize) {
            if (this.state.mazeFixed[row +1][col] === 3)  { nextMazeLevel() } 
            if (
            (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row +1][col]) === -1) &&
            (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row +1][col]) === -1)
          ) {
              playerInstance.row +=1;
            }; 
          }
        };
        if (JSON.stringify([row, col]) === JSON.stringify([this.state.mazeWandLocation.row, this.state.mazeWandLocation.col]) ) {
          var playerWandInstance = this.state.player;
          playerWandInstance.weapons.push('firewand');
        
          this.setState({player: playerWandInstance});
          this.state.mazeWandLocation.pickedUp = true;
        }
        this.attackChecker();
        this.findAttackSquarePlayer();
        
      }
    }


    //CHARACHTER ROTATION FN
    var characterRotationFn = () =>{
      if (this.state.player.attack.closeAttackHappening === false) {

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
        this.findAttackSquarePlayer();

      }
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
    // this.findAttackSquare(playerInstance);
    this.setState({player: playerInstance, mazeActive: mazeActiveInstance});
    this.buildMazeFN();  
  }


  monsterMover() {
    let monsterInstance = this.state.monster;
    let {col, row, direction} = monsterInstance;


    var roll = Math.floor(Math.random()*4);
    var monsterMoved = false;
    console.log('monstermoved happened', monsterMoved);
    // MonsterMoveLoopStart :

    // while(monsterMoved === false) {
    var infiniteLoopCatcher = 0;
    infiniteLoopCatcher ++;
    if (infiniteLoopCatcher === 100) {debugger;}

   if (roll === 0) {
      // console.log('monster left');
      if (this.state.mazeFixed[row][col -1] > -1) {
        if (
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) &&
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row][col -1]) === -1)
        ) {
          monsterInstance.direction = 'left';
          monsterInstance.icon = 'L';  
          monsterInstance.col -=1;   
          monsterMoved = true; 
          // console.log('MOVED LEFT');
          // break MonsterMoveLoopStart;   
        }; 
      }
      if (monsterMoved === false) { roll = 1; console.log('MODIFIED to move up')}
    }
    if(roll === 1) {
      // console.log('monster up');
      if (row - 1 > -1) {
        if (
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row -1][col]) === -1) && 
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row -1][col]) === -1)
        ) {
          monsterInstance.direction = 'up'; 
          monsterInstance.icon = 'U';
          monsterInstance.row -=1;   
          monsterMoved = true; 
          // console.log('MOVED UP');
          // break MonsterMoveLoopStart;    
        }
      };
      if (monsterMoved === false) { roll = 2; console.log('MODIFIED to move right') }
    }
    if(roll === 2) {
      // console.log('monster right');
      if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
        if (
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) &&
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row][col +1]) === -1)
      ) {
          monsterInstance.direction = 'right'; 
          monsterInstance.icon = 'R';
          monsterInstance.col +=1; 
          monsterMoved = true; 
          // console.log('MOVED RIGHT'); 
          // break MonsterMoveLoopStart;   
        }
      };
      if (monsterMoved === false) { roll = 3; console.log('MODIFIED to move down')}
    }
    if(roll === 3){
      // console.log('monster down');
      if (row + 1 < this.state.mazeSize) {
        if (
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row +1][col]) === -1) &&
          (this.state.mazeNoGoSquares.indexOf(this.state.mazeActive[row +1][col]) === -1)
        ) {
          monsterInstance.direction = 'down';
          monsterInstance.icon = 'D'; 
          monsterInstance.row +=1;
          monsterMoved = true; 
          // console.log('MOVED DOWN');
          // break MonsterMoveLoopStart;    
        }
      };
      // if (monsterMoved === false) { roll = 1; console.log('MODIFIED')};
    }
    // }
    this.findAttackSquareMonster();
    this.setState({monster: monsterInstance});
    this.buildMazeFN(); 
    this.attackChecker();
  }


  findAttackSquareMonster () {
    let monsterInstance = this.state.monster;
    let {row, col, attack} = monsterInstance;
    attack.row = row;
    attack.col = col;
    let attackPossible = false;
    if (monsterInstance.direction === 'left') {
      // console.log('looking left');

      if (monsterInstance.attack.col -1 > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) {
          attack.col = col -1;  
          attackPossible = true; 
        }; 
      }

    }
    if (monsterInstance.direction === 'up') {
      // console.log('looking up');

      if (row - 1 > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row-1][col ]) === -1) {
          attack.row = row -1;  
          attackPossible = true; 
        }
      };

    }
    if (monsterInstance.direction === 'right') {
      // console.log('looking right');

      if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) {
          attack.col = col +1;  
          attackPossible = true;   
        }
      };

    }
    if (monsterInstance.direction === 'down') {
      // console.log('looking down');
      if (row + 1 < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row+1][col ]) === -1) {
          attack.row = row +1;  
          attackPossible = true;   
        }
      };

    }
    if (attackPossible === false) {
      // console.log('NO ATTACK POSSIBLE');
      attack.row = null; attack.col = null
    }
    //console.log('ATTACK LOCATION = ', attack.row, attack.col);
    this.setState({monster: monsterInstance});
  }


  findAttackSquarePlayer () {
    let playerInstance = this.state.player;
    let {row, col, attack} = playerInstance;
    attack.row = row;
    attack.col = col;
    let attackPossible = false;
    if (playerInstance.direction === 'left') {
      // console.log('looking left');

      if (playerInstance.col -1 > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col -1]) === -1) {
          attack.col = col -1;  
          attackPossible = true; 
        }; 
      }
    }
    if (playerInstance.direction === 'up') {
      // console.log('looking up');

      if (row - 1 > -1) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row-1][col ]) === -1) {
          attack.row = row -1;  
          attackPossible = true; 
        }
      };
    }
    if (playerInstance.direction === 'right') {
      // console.log('looking right');

      if (this.state.mazeFixed[row][col +1] < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row][col +1]) === -1) {
          attack.col = col +1;  
          attackPossible = true;   
        }
      };
    }
    if (playerInstance.direction === 'down') {
      // console.log('looking down');
      if (row + 1 < this.state.mazeSize) {
        if (this.state.mazeNoGoSquares.indexOf(this.state.mazeFixed[row+1][col ]) === -1) {
          attack.row = row +1;  
          attackPossible = true;   
        }
      };
    }
    if (attackPossible === false) {
      // console.log('NO ATTACK POSSIBLE');
      attack.row = null; attack.col = null
    }
    //console.log('ATTACK LOCATION = ', attack.row, attack.col);
    this.setState({player: playerInstance});
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
    var firewandReaout;
    this.state.player.weapons.indexOf('firewand') !== -1 ? firewandReaout = <li>E = Shoot Energy Ball</li>: firewandReaout = <li>PICK UP WAND FOR MORE!</li>;
    // var gameStyle = {width: '100%', margin: 'auto', padding: '10px'};
    return (
      <div>
        <div className="row-container-vertical-style audio-control-style">
          <p>AUDIO CONTROL</p>
          <audio controls autoPlay>
            <source src="gamemusic.mp3" type="audio/mpeg" />  
          </audio>
        </div>
        
        <div className="row-container-center-style game-map-display">
          <RowsList data={this.state.mazeRender}/>
        </div>
        {/*<input id="gameinput" type="text" onKeyDown={this.playerInputHandlerFn.bind(this)}></input>*/}   
        <div id="d-pad">
          <div className="row-container-vertical-style">
            <div id="touch-btn-up" onClick={this.playerInputHandlerFn.bind(this)}></div>
            <div className="row-container-center-style">
              <div id="touch-btn-left" onClick={this.playerInputHandlerFn.bind(this)}></div>
              <div id="touch-btn-center"></div>
              <div id="touch-btn-right" onClick={this.playerInputHandlerFn.bind(this)}></div>
            </div>
            <div id="touch-btn-down" onClick={this.playerInputHandlerFn.bind(this)}></div>
          </div>
          <div className="button-wrapper">
            <div id="attack-button--close__entire-wrapper">
              <div id="attack-button--close" onClick={this.playerInputHandlerFn.bind(this)}></div>
              <p>Attack</p>
            </div>
            <div id="attack-button--close__entire-wrapper">
              <div id="attack-button--wall" onClick={this.playerInputHandlerFn.bind(this)}></div>
              <p>Wall</p>
            </div>
            <div id="attack-button--wall__entire-wrapper">
              <div id="attack-button--energy" onClick={this.playerInputHandlerFn.bind(this)}></div>
              <p>Energy</p>
            </div>
          </div>
        </div>
          {/*<button className="mode-button" id="touch-btn-up" onClick={this.playerInputHandlerFn.bind(this)}>U</button>
          <button className="mode-button" id="touch-btn-down" onClick={this.playerInputHandlerFn.bind(this)}>D</button>
          <button className="mode-button" id="touch-btn-left" onClick={this.playerInputHandlerFn.bind(this)}>L</button>
          <button className="mode-button" id="touch-btn-right" onClick={this.playerInputHandlerFn.bind(this)}>R</button>*/}
        <div className="row-container-center-style">
          <div className="game-instructions">
          <ul>Player Abilities: 
            <li>Use Arrow Keys Or Icons To Move</li>
            <li>A = Attack Close</li> 
            <li>W = Build Wall To Block Monster</li>
            {firewandReaout}
          </ul>
          </div>
        </div> 
        <div className="row-container-center-style">
          <button className="mode-button" id="rotation" onClick={this.changeGameMode.bind(this)}>{buttonContent}</button>
        </div>
      </div>
    )
  }
}
export default Game;



