import React from 'react';
import SpecificRow from './specificrow.js';

var RowsList = (props) => (
  <div>
    {props.data.map((item, i) => <SpecificRow info={item} key={i}/>)}
  </div>
  )


export default RowsList;



