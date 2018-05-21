import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Buttons';
import Remove from './Remove';

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

// how to pass down equals into own component 
// pass clear into new component use props

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      display: '',
      firebaseDisplay: '',
      equation: [],
      savedEquations: [],
      lastInputOperation: null,
      lastActionWasOperation: false,
      userEnter: false,
      didIsayHello: false
    }
    this.userInput = this.userInput.bind(this);
    this.sendNumber = this.sendNumber.bind(this);
    this.userEnter = this.userEnter.bind(this);
    this.updateEquation = this.updateEquation.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    // this.hello = this.hello.bind(this);
  }

  // send to firebase
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
      const completed = equationArray.filter((equation) => {
        return equation.completed === true;
      });
      this.setState({
        savedEquations: equationArray
      })
    });
  }

  // convenience functions
  // Accepts what user enters and pushes the results into an array
  updateEquation(input) {
    let currentEquation = this.state.equation;
    console.log(input);
    currentEquation.push(input);
    this.setState({
      equation: currentEquation
    })
    this.updateDisplay();
    // console.log(this.state.equation);
  }

  // updates the display of the function to look correctly
  updateDisplay() {
    let heldEquation = this.state.equation;
    let equationString = heldEquation.toString();
    let viewEquation = equationString.replace(/,/g, '');
    console.log(viewEquation);
    this.setState({
      display: viewEquation
    })
  }

  // end convenience functions
  // this will update the view window when the user presses a number
  // handles only what the user pushes 
  userInput(selectedInput) {
    if (typeof (selectedInput) === 'number') {
      let lastAction = this.state.lastActionWasOperation;
      lastAction = false;
      this.setState({
        lastActionWasOperation: lastAction,
        lastInputOperation: null
      }, () => {
        this.updateEquation(selectedInput);        
      })
    } else {
      if (this.state.lastInputOperation === null) {
        let currentOperation = this.state.lastInputOperation;
        currentOperation = selectedInput;
        console.log(currentOperation);
        this.setState({
          lastInputOperation: currentOperation
        }, () => {
          this.updateEquation(selectedInput);
        });
      } else {
        if (this.state.lastInputOperation === selectedInput) {                   
            // sets up future users 
          return false;
          
        } else {
          let currentEquation = this.state.equation;
          console.log(currentEquation);
          console.log(selectedInput);
          console.log(currentEquation);
          currentEquation.pop();
          currentEquation.push(selectedInput);
          this.setState({
            equation: currentEquation
          })
          this.updateDisplay();
        }
      }
    }
  }

  //  evals the final equation when they hit enter
  // here i need to add an if statement to evaluate if they previously entered a string
  // if so pop that out and push in the equal sign
  // if not then run like normal

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
    dbRef.push(wholeAnswer);
    this.setState({
      display: theAnswer
    })
  }

  // hello () {
  //   console.log('hello');
  // }

  removeEquation(keyToRemove) {
    firebase.database().ref(`Question/${keyToRemove}`).remove();
  }

  userClear() {
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
      <div className="wrapper">
            <h1>Never Calc Down!</h1>
        <div className="formWrap">
          <div className="calcWrap">
            <form action="" onSubmit={this.sendNumber}>
              <div>
                <input type="text" disabled={true} value={this.state.display} />
                {/* 1- passed in the function, this creates a prop, makes it accesbile in the children */}
                <Buttons userinputs={this.userInput}/>
                {/* <Buttons sayhello={this.hello} /> */}
                <button className="diffBut" onClick={() => this.userEnter()}>=</button>
                <button className="diffBut" onClick={() => this.userClear()}>C</button>
              </div>
            </form>
          </div>
          <div className="detail">
          <h2>Equations:</h2>
            <ul>
              {this.state.savedEquations.map((input) => {
                // these are all passed to the child, this is passing the PROP
                // console.log(input)
                return <Remove
                  // going in the array to find they individual key on each item
                  key={input.key}
                  display={input.finalFinalResult}
                  equation={input.theAnswer}
                  firebaseKey={input.key}
                  firebaseDisplay={input.finalFinalResult}
                  result={input.theAnswer}
                  removeEquation={this.removeEquation}
                />
              })}
            </ul>
          </div>
        </div>
        <footer>
          <div>
            <p>© 2018 Made by <a href="https:/www.mikaelamade.com" target="_blank">Mikaela Scornaienchi</a></p>
          </div>
        </footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));