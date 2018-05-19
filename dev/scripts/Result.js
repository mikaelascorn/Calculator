import React from 'react';

const Result = (props) => {
  return (
    // terinary, if the state is completed, add class completed or else do thing, pulls from the state, ? if, : else
    <li className={props.completed === true ? 'completed' : null}>
      <p>{props.equation} = {props.theAnswer}</p>
      {/* pass parameters from APP/parent */}
      {/* in this on click listener we want to pass data from this component to our parent component
      In order to do this we need to use an anonomous arrow function as the function to be called and inside of the function we call our completetodo function */}
      {/* pass parameters from APP/parent */}
      <button onClick={() => props.removeEquation(props.firebaseKey)}>Remove!!</button>
    </li>
  )
};

export default Result;