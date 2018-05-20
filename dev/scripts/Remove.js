import React from 'react';

const Remove = (props) => {
  console.log(props);
  return (
    <li>
      <p>{props.display}<span>=</span><span>{props.equation}</span></p>
      <button onClick={() => props.removeEquation(props.firebaseKey)}>❌</button>
    </li>
  )
};

export default Remove;