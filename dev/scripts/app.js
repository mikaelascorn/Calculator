import React from 'react';
import ReactDOM from 'react-dom';

// On submit log the calculation to the screen.
// Start with numbers on the screen, individual buttons, they all have one state, and it gets altered and it updates on submit/enter/=
// Calculator is the APP and the notepad is the child Component?
// Make it work and then set up firebase
// Strech goal is a notepad on the sign, a full bugeting app, strech strech is a signin

// this function will operate the submit window on 
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: '0', 
    }
    this.userInput = this.userInput.bind(this);
    // this.onEnter = this.onEnter.bind(this);
  }
 
  // maybe change to componentDidMount() for firebase? 
  // this will update the view window when the user presses a number
  userInput(e) {
    console.log(number);
    e.stopPropogation();
    e.preventDefault();
    this.setState({
      display: display + userInput.val()
    })
    console.log('button clicked');
    
  }

  render() {
    return (
      <div>
        <h1>Never Calc Down!</h1>
        <form action="">
          <div>
            <input type="text" disabled={true} value={this.state.display} />
          </div>
          <div>
            <button onClick={() => this.userInput(7)}>7</button>
            <button onClick={() => this.userInput(8)}>8</button>
            <button onClick={() => this.userInput(9)}>9</button>
            <button>*</button>
          </div>
          <div>
            <button onClick={() => this.userInput(4)}>4</button>
            <button onClick={() => this.userInput(5)}>5</button>
            <button onClick={() => this.userInput(6)}>6</button>
            <button>-</button>
          </div>
          <div>
            <button onClick={() => this.userInput(1)}>1</button>
            <button onClick={() => this.userInput(2)}>2</button>
            <button onClick={() => this.userInput(3)}>3</button>
            <button>+</button>
          </div>
          <div>
            <button onClick={() => this.userInput(0)}>0</button>
            <button>C</button>
            <button>/</button>
            <button>=</button>
          </div>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
