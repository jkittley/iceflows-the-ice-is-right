

function compareFacts(guess, existingCardVal, dealtCardVal) {
  console.log(guess, existingCardVal, dealtCardVal);
  if (!(guess === "higher" || guess === "lower")) return null;
  if (existingCardVal > dealtCardVal) {
    console.log("Dealt card is lower");
    if (guess === "higher") {
      console.log("and you guessed it would be higher - LOOSE");
      return -1;
     } else {
      console.log("and you guessed it would be lower - WIN");
      return 1;
     }
  } else if (existingCardVal < dealtCardVal) {
    console.log("Dealt card is higher");
    if (guess === "higher") {
      console.log("and you guessed it would be higher - WIN ");
      return 1;
    }  else {
      console.log("and you guessed it would be lower - LOOSE");
      return -1;
    }
  } else {
    console.log("Its a draw");
    return 0;
  }
}

export {compareFacts};