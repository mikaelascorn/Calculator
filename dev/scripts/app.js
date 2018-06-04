import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './Buttons';
import Remove from './Remove';
import Enter from './Enter';
import Clear from './Clear';
import Footer from './Footer';

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
      // didIsayHello: false,
    }
    this.userInput = this.userInput.bind(this);
    this.sendNumber = this.sendNumber.bind(this);
    this.userEnter = this.userEnter.bind(this);
    this.userClear = this.userClear.bind(this);
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

  // checks for a sign
  userEnter(finalEquation) {
    console.log(this.state.lastInputOperation);
    if (this.state.lastInputOperation === null) {

      this.evalResult(finalEquation);

    } else {

    let currentEquation = this.state.equation;
      currentEquation.pop();
      currentEquation.push(this.statelastActionWasOperation);

      this.evalResult(finalEquation);
    }
  }

  // then it evals it!
  evalResult(result) {
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
      <div className="opacity">
        <div className="wrapper">
          <h1>Never Calc Down!</h1>
          <div className="formWrap">
            <div className="calcWrap">
              <form action="" onSubmit={this.sendNumber}>
                <div>
                  <input type="text" disabled={true} value={this.state.display} />
                  <Buttons userinputs={this.userInput}/>
                  {/* <Buttons sayhello={this.hello} /> */}
                  <div className="special">
                    <Enter userEnters={this.userEnter} />
                    {/* <button className="diffBut clearBut" onClick={() => this.userClear()}>C</button> */}
                    <Clear userClears={this.userClear} />
                  </div>
                </div>
              </form>
            </div>
            <div className="detail">
            <h2>Equations:</h2>
              <ul>
                {this.state.savedEquations.map((input) => {
                  // console.log(input)
                  return <Remove
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
          <Footer />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));