
import React from 'react';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '/', '*', '-', '+']

const Button = (props) => {
  console.log(props.number);
  // 3 call the chain on click, to trigger the actual hello function
  return (
    <button onClick={ () => props.usernumber(props.number)} >{props.number}</button>
    // <button onClick={props.morehello} >{props.number}</button>

  )
}

const Buttons = (props) => {
    return (
      <div>
        {numbers.map( (number, i) => {
          // 2- passinng the sayhello through child props
           return <Button 
                  usernumber={props.userinputs} 
                  number={number} 
                  key={i}/>
          // return <Button morehello={props.sayhello} number={number} key={i} />

        })}
        </div>
    );
  }




export default Buttons;
