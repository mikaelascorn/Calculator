import React from 'react';
import ReactDOM from 'react-dom';

// On submit log the calculation to the screen.
// Start with numbers on the screen, individual buttons, they all have one state, and it gets altered and it updates on submit/enter/=
// Calculator is the APP and the notepad is the child Component?
// Make it work and then set up firebase
// Strech goal is a notepad on the sign, a full bugeting app, strech strech is a signin

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      operator: ''
    }
    this.userInput = this.userInput.bind(this);
    this.sendNumber = this.sendNumber.bind(this);
    // this.userEnter = this.userEnter.bind.(this);
  }
  sendNumber(e) {
    e.preventDefault();
  }
  // maybe change to componentDidMount() for firebase? 
  // this will update the view window when the user presses a number
  userInput(selectedNumber) {
    console.log(selectedNumber);
    this.setState({
      display: this.state.display + selectedNumber
      // use bottom to get rid of the 0 when they start typing
      // display: display === '0' ? '0' : this.state.display + selectedNumber
    })
    // recall our conversation about boxes and parameters
    // what is selectedNumber in this case, and how am I shoving a number into it?
    return selectedNumber;
  }

  userClear() {
    console.log('clear');
    this.setState({
      display: '0'
    }) 
  }
  userEnter() {
    console.log('enter');
    // come here update state and string together the firstNum and the operator and secondNum
    // then stop to re set state
    this.setState({
      // display: this.state.display.toString()
      display: (`${firstNum}${operator}${lastNum}`)

    })
  }

  userMath(operator) {
    console.log(operator);
    this.setState({
      // remember what comes before the operator in the first num and then update display to 0 and set state to second num
      // has to be everything before the operator
      firstNum: this.state.display,
      // display: this.state.display 
      // hold the operator sign
      operator: operator,
      secondNum: ''

    })
  }

  render() {
    return (
      <div>
        <h1>Never Calc Down!</h1>
        <form action="" onSubmit={this.sendNumber}>
          <div>
            <input type="text" disabled={true} value={this.state.display} />
          </div>
          <div>
            <button onClick={() => this.userInput(7)}>7</button>
            <button onClick={() => this.userInput(8)}>8</button>
            <button onClick={() => this.userInput(9)}>9</button>
            <button onClick={() => this.userMath('/')}>/</button>
          </div>
          <div>
            <button onClick={() => this.userInput(4)}>4</button>
            <button onClick={() => this.userInput(5)}>5</button>
            <button onClick={() => this.userInput(6)}>6</button>
            <button onClick={() => this.userMath('*')}>*</button>
          </div>
          <div>
            <button onClick={() => this.userInput(1)}>1</button>
            <button onClick={() => this.userInput(2)}>2</button>
            <button onClick={() => this.userInput(3)}>3</button>
            <button onClick={() => this.userMath('-')}>-</button>
          </div>
          <div>
            <button onClick={() => this.userInput(0)}>0</button>
            <button onClick={() => this.userClear()}>C</button>
            <button onClick={() => this.userMath('+')}>+</button>
            <button onClick={() => this.userEnter('=')}>=</button>
          </div>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));