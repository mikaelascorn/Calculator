import React from 'react';

const Holding = (props) => {
  // console.log(props);

  return (
    <li>
      <p>{props.equation}<span>{props.display}</span></p>
      <button onClick={() => props.removeEquation(props.firebaseKey)}>Remove!!</button>
    </li>
  )
};

export default Holding;