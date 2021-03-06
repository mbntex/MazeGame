import React from 'react';
 
var Levels = {
  level1F: [
        [0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0], 
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 3]
      ],
  level1A: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
  level1R: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
      level2F: [
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
  level2A: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
  level2R: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
      levelMonsterWinsF: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0], 
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1]
      ],
  levelMonsterWinsA: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
  levelMonsterWinsR: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
      levelPlayerWinsF: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0], 
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1]
      ],
  levelPlayerWinsA: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ],
  levelPlayerWinsR: [
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ], 
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ],
        [, , , , , , , , , , , ]
      ]






}





export default Levels;


