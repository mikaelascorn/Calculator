import React from 'react';

const Holding = (props) => {
  // console.log(props);

  return (
    <li>
      <p>{props.equation}<span>{props.display}</span></p>
      {/* {console.log(props.display)} */}

      {/* <p>{props.equation}</p> */}
      {/* {      console.log(props.equation) */}

      {/* <p>{props.firebaseKey}</p> */}
      {/* {console.log(props.firebaseKey)} */}

      {/* <button onClick={() => props.removeEquation(props.firebaseKey)}>Remove!!</button> */}
    </li>
  )
};

export default Holding;