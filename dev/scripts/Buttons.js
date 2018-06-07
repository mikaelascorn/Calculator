
import React from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '/', '*', '-', '+']

const Button = (props) => {
    return (
    <button onClick={ () => props.usernumber(props.number)} >
      {props.number}
    </button>
  )
}

const Buttons = (props) => {
    return (
      <div>
        {numbers.map( (number, i) => {
           return <Button 
                  usernumber={props.userinputs} 
                  number={number} 
                  key={i} />
        })}
        </div>
    );
  }

export default Buttons;
