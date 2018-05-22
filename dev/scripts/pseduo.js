// 1 update equation - accepts user inputs and pushes the results to an array, this.state.equation- set the state to be the current equation, then run through 2
// 2 update display - to make sure the equation views one thescreen as an equation and not an array
// 3 USERINPUT - 
// A - if the user types a number, set state of LAWO to false and set LIO to null - then use a callback function, to run the selected input through update the equation function -1
  // does this if user enters a number, runs normal
// B - if last input was not an operator, keep set state of LIO to current - aka null - then the call back function to 1
  // 
// C if this.state.equation (current E) is same as what user is entering -- RETURN FALSE
  // if two types of operators back to back
// D if this.state.equation (current E) and what theyre entering now are both strings - .pop off what they previously entered and and then .push into the array the new selected input
  // re set the state to this new equation with the last operator only
// user enter - on enter = convert the final equation to a string without , and eval()


// even if i just add/if else statement, or if i add if else and then run them through a new function to evaluate - i can get rid of the sign at the end if they change their mind, but I cannot get it to calculate - callback function? theyre not going through the function with eval()



