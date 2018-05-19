import React from 'react';
import ReactDOM from 'react-dom';
import Result from './Result';
import Holding from './Holding';

import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBdREr20ow0SQ_1ob6hPRGJnTTvnah-Pis",
  authDomain: "never-calc-down.firebaseapp.com",
  databaseURL: "https://never-calc-down.firebaseio.com",
  projectId: "never-calc-down",
  storageBucket: "never-calc-down.appspot.com",
  messagingSenderId: "234463903284"
};
firebase.initializeApp(config);

// On submit log the calculation to the screen.
// Start with numbers on the screen, individual buttons, they all have one state, and it gets altered and it updates on submit/enter/=
// Calculator is the APP and the notepad is the child Component?
// Make it work and then set up firebase
// Strech goal is a notepad on the sign, a full bugeting app, strech strech is a signin

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      display: '',
      firebaseDisplay: '',
      equation: [],
      savedEquations: [],
      currentOperation: null,
      lastActionWasOperation: false,
    }
    this.userInput = this.userInput.bind(this);
    this.sendNumber = this.sendNumber.bind(this);
    this.userEnter = this.userEnter.bind(this);
  }

  componentDidMount() {
    const dbRef = firebase.database().ref('Question');

    // use this refence to connect a listener to the database 
    // after we connect that listener it is always listening
    dbRef.on('value', (snapshot) => {

      const equations = snapshot.val();
      const equationArray = [];

      for (let item in equations) {
        // console.log(equation);

        equations[item].key = item;
        equationArray.push(equations[item])
      }
      this.setState({
        savedEquations: equationArray
      })

    });
  }
  // this will update the view window when the user presses a number
  userInput(selectedInput) {
    console.log(selectedInput);

    // check if it's a number, if its a number push to array
    
    // if flag on state is false - allow it into state
    // flag on state is true, clear array then add new thing. 

    if (typeof(selectedInput) === 'number'){
      // refactor
      let lastAction = this.state.lastActionWasOperation;
      lastAction = false;
      this.setState({
        lastActionWasOperation: lastAction
      })
      let currentEquation = this.state.equation;
      currentEquation.push(selectedInput);
      this.setState({
        equation: currentEquation
      })
      console.log(this.state.equation);
    } else {
      if (!this.state.lastActionWasOperation){
        let currentOperation = this.state.currentOperation;
        currentOperation = selectedInput;
        this.setState({
          currentOperation: currentOperation,
        },()=>{
          // refactor
          let updatedEquation = this.state.equation
          updatedEquation.push(selectedInput);
          this.setState({
            equation: updatedEquation,
            lastActionWasOperation: true
          })
          console.log(this.state.equation);
        })
      } else {

        return false;

      }
    }
    let heldEquation = this.state.equation;
    let equationString = heldEquation.toString();
    let viewEquation = equationString.replace(/,/g, '');

    this.setState({
      display: viewEquation
    })

    // let fixedOperators = this.state.operator;

    //  console.log(typeof(selectedInput));
    // if (fixedOperators.length === 1) {
    //   console.log('reached');

    //   fixedOperators.push(selectedInput);

    //   this.setState({
    //     operator: fixedOperators
    //   })

    // } else if (this.state.operator !== '') {
    //   // alert('Incorrect')
    //   // the previous entry was a string dont go
    // }

    // hold this and then push to state
    // let holdingEquation = this.state.equation;

    // dont change state directly
    // holdingEquation.push(selectedInput);

    // let heldEquation = holdingEquation.toString();

    // let viewEquation = heldEquation.replace(/,/g, '');
    // console.log(viewEquation);

    // this.setState({
    //   display: viewEquation,
    //   equation: holdingEquation
    // })
    // console.log(this.state.equation);
    // console.log(holdingEquation);

  }

  userEnter(finalEquation) {

    let finalResult = (this.state.equation).toString();
    // g is global for regex
    const finalFinalResult = finalResult.replace(/,/g, '');
    // console.log(finalFinalResult);

    const theAnswer = eval(finalFinalResult);

    const wholeAnswer = {
      theAnswer: theAnswer,
      finalFinalResult: finalFinalResult,
    }

    const dbRef = firebase.database().ref('Question');
    // push it in 
    dbRef.push(wholeAnswer);

    this.setState({
      display: theAnswer
    })
  }

  userClear() {
    console.log('clear');
    this.setState({
      display: '',
      equation: []
    })
  }

  sendNumber(e) {
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
        {/* <h2>Result:</h2>
        <ul>
          {this.state.equation.map((input) => {
            // these are all passed to the child, this is passing the PROP
            // console.log(input.key)
            return <Result
              // going in the array to find they individual key on each item
              key={input.key}
            // display={input.finalFinalResult}
            // equation={input.theAnswer}
            // firebaseKey={input.key} />
            />
          })}
        </ul> */}
        <h2>Equations:</h2>
        <ul>
          {this.state.equation.map((input) => {
            // these are all passed to the child, this is passing the PROP
            // console.log(input.key)
            return <Holding
              // going in the array to find they individual key on each item
              key={input.key}
              display={input.finalFinalResult}
              equation={input.theAnswer}
              firebaseKey={input.key} />
          })}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));