import React from 'react';
import ReactDOM from 'react-dom';
// import firebase from 'firebase';

// var config = {
//   apiKey: "AIzaSyBdREr20ow0SQ_1ob6hPRGJnTTvnah-Pis",
//   authDomain: "never-calc-down.firebaseapp.com",
//   databaseURL: "https://never-calc-down.firebaseio.com",
//   projectId: "never-calc-down",
//   storageBucket: "never-calc-down.appspot.com",
//   messagingSenderId: "234463903284"
// };
// firebase.initializeApp(config);


// On submit log the calculation to the screen.
// Start with numbers on the screen, individual buttons, they all have one state, and it gets altered and it updates on submit/enter/=
// Calculator is the APP and the notepad is the child Component?
// Make it work and then set up firebase
// Strech goal is a notepad on the sign, a full bugeting app, strech strech is a signin

// let user push buttons
// equate the buttons to values 
// create a string - concat 
// return the result to user when they press enter
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      display: '',
      equation: []
    }
    this.userInput = this.userInput.bind(this);
    this.sendNumber = this.sendNumber.bind(this);
  }
  
  sendNumber(e) {
    e.preventDefault();
  }

  // maybe change to componentDidMount() for firebase? 
  // this will update the view window when the user presses a number
  userInput(selectedInput) {

    // hold this and then push to state
    let holdingEquation = this.state.equation;

    // dont change state direction
    holdingEquation.push(selectedInput);
    console.log(holdingEquation);
    
    this.setState({
      equation: holdingEquation
    })
    console.log(this.state.equation);
    
  }
  
  userEnter() {
    
    // const firstHalf = Number.parseInt(this.state.firstNum);
    // const secondHalf = Number.parseInt(this.state.secondNum);
    
    this.setState({
      display: this.setState,
      
    })  
    
    // const dbRef = firebase.database().ref('display');
    // // push it in 
    // dbRef.push(display);
    // // this is to re set the state, like updating the property value, empty string so the field clears everytime
    // this.setState({
      
      // })
    }
    
      userClear() {
        console.log('clear');
        this.setState({
          display: ''
        }) 
      }
  
  sendNumber(e){
    e.preventDefault();
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
            <button onClick={() => this.userInput('/')}>/</button>
          </div>
          <div>
            <button onClick={() => this.userInput(4)}>4</button>
            <button onClick={() => this.userInput(5)}>5</button>
            <button onClick={() => this.userInput(6)}>6</button>
            <button onClick={() => this.userInput('*')}>*</button>
          </div>
          <div>
            <button onClick={() => this.userInput(1)}>1</button>
            <button onClick={() => this.userInput(2)}>2</button>
            <button onClick={() => this.userInput(3)}>3</button>
            <button onClick={() => this.userInput('-')}>-</button>
          </div>
          <div>
            <button onClick={() => this.userInput(0)}>0</button>
            <button onClick={() => this.userClear()}>C</button>
            <button onClick={() => this.userInput('+')}>+</button>
            <button onClick={() => this.userEnter('=')}>=</button>
          </div>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));