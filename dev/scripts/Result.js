import React from 'react';

const Result = (props) => {
  return (
    <li>
      <p>{props.display}</p>
      <p>{props.equation}</p>
      <p>{props.firebaseKey}</p>
      {/* <button onClick={() => props.removeEquation(props.firebaseKey)}>Remove!!</button> */}
    </li>
  )
};

export default Result;