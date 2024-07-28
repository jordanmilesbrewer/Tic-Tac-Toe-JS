//first step, we need to attach event (submit) listener to the form to get user data

//attach event listener to each 'game box' (cick)

//next, initialize the game

//next, we need to check which game mode we're playing

//next, we need to set win conditions

//we need to determine current player

//after each move, check win conditions  and if not met, set other player as active

const form = document.querySelector(".form-submit");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //this stops the form from reseting when refreshing page

  //initialize user form data
  const formData = new FormData(form); //this gets the data from the form
  const data = Object.fromEntries(formData); //this converts the data into an object which can be used
  console.log(data);
});
