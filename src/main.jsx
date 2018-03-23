import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './wrapper.jsx';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Wrapper),
    document.getElementById('mount')
  );
});