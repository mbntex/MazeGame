import React from 'react';
//import testImage from '/images/t1.jpg';
// import mazeimage from './t1.jpg';

var SpecificRow = (props) => {

var BackgroundHere = "https://www.spriters-resource.com/resources/sheets/45/47828.png"

    var testSprite  = {
      width: '40px',
      height: '40px',
      //background: url(twobytwoTransparent.gif 0 0) 0 0
      background: `url(twobytwoTransparent.gif) 0 0`
    }

    var walkway = "/path.png";
    var grass = "/grass.png";
    var monsterU = "/monsterup.png";
    var monsterL = "/monsterleft.png";
    var monsterD = "/monsterdown.png";
    var monsterR = "/monsterright.png";
    var playerU = "/playerup.png";
    var playerL = "/playerleft.png";
    var playerD = "/playerdown.png";
    var playerR = "/playerright.png";
    var fireball = "/fb.png";
    var weaponup = "/sword.png";
    var attackedSquare = '/attack.png';
    var newWall = '/wallbig.png';
    var crumblingWall = '/wallsmall.png';
    var stairs = '/stairs.png';

    
    //RENDERIN IMAGES FROM ROW FUNCTION
    var arrayToRender = [];
    var filterIncommingRow = function (currentRow) {
      for (var i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 0) { arrayToRender.push(<img style={testSprite} src={grass}></img>);}
        if (currentRow[i] === 1) { arrayToRender.push(<img style={testSprite} src={walkway}></img>); }
        if (currentRow[i] === 3) { arrayToRender.push(<img style={testSprite} src={stairs}></img>); }
        if (currentRow[i] === 'F') { arrayToRender.push(<img style={testSprite} src={fireball}></img>); }
        if (currentRow[i] === '/') { arrayToRender.push(<img style={testSprite} src={weaponup}></img>); }
        if (currentRow[i] === '^') { arrayToRender.push(<img style={testSprite} src={playerU}></img>); }
        if (currentRow[i] === '<') { arrayToRender.push(<img style={testSprite} src={playerL}></img>); }
        if (currentRow[i] === 'V') { arrayToRender.push(<img style={testSprite} src={playerD}></img>); }
        if (currentRow[i] === '>') { arrayToRender.push(<img style={testSprite} src={playerR}></img>); }
        if (currentRow[i] === 'U') { arrayToRender.push(<img style={testSprite} src={monsterU}></img>); }
        if (currentRow[i] === 'L') { arrayToRender.push(<img style={testSprite} src={monsterL}></img>); }
        if (currentRow[i] === 'D') { arrayToRender.push(<img style={testSprite} src={monsterD}></img>); }
        if (currentRow[i] === 'R') { arrayToRender.push(<img style={testSprite} src={monsterR}></img>); }
        if (currentRow[i] === 'W') { arrayToRender.push(<img style={testSprite} src={newWall}></img>); }
        if (currentRow[i] === 'w') { arrayToRender.push(<img style={testSprite} src={crumblingWall}></img>); }
        if (currentRow[i] === 'A') { arrayToRender.push(<img style={testSprite} src={attackedSquare}></img>); }
      }
    }

    filterIncommingRow(props.info);



  return (
  <div className="row">
    {arrayToRender}
    {/*props.info*/}
    {/*tempToRenderHereProcessed*/}

  </div>
  )
}


export default SpecificRow;