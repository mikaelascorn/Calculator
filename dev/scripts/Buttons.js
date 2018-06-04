
import React from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '/', '*', '-', '+']

const Button = (props) => {
  // console.log(props.number);
  // 3 call the chain of events on click, to trigger the actual function, pass the props and individual numbers through it, userInput(selectedInput) = usernumber(props.number) - give it a callback function so it waits and doesnt break the browser
  return (
    <button onClick={ () => props.usernumber(props.number)} >
      {props.number}
    </button>
    // <button onClick={props.morehello} >{props.number}</button>
  )
}

const Buttons = (props) => {
    return (
      <div>
        {numbers.map( (number, i) => {
          // 2- passinng the function through child props, this maps over and gives us all the numbers as an individual button, with individual keys
           return <Button 
                  usernumber={props.userinputs} 
                  number={number} 
                  key={i} />
          // return <Button morehello={props.sayhello} number={number} key={i} />
        })}
        </div>
    );
  }

export default Buttons;
