//first step, we need to attach event (submit) listener to the form to get user data

//attach event listener to each 'game box' (cick)

//next, initialize the game

//next, we need to check which game mode we're playing

//next, we need to set win conditions

//we need to determine current player

//after each move, check win conditions  and if not met, set other player as active

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const form = document.querySelector(".form-submit");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //this stops the form from reseting when refreshing page

  //initialize user form data
  const formData = new FormData(form); //this gets the data from the form
  const data = Object.fromEntries(formData); //this converts the data into an object which can be used
  initialiseGame(data);
  document.querySelector("#initial-modal").style.display = "none";
});

function initialiseVariables(data) {
  data.choice = +data.choice; //this converts the data.choice from a string into an integer
  data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //this means we can access any of the squares and change their values
  data.player1 = "X";
  data.player2 = "O";
  data.round = 0;
  data.currentPlayer = "X";
  data.gameOver = false;
}

function addEventListenersToGameBoard(data) {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", (event) => {
      playMove(event.target, data);
    }); //this basically gives tells me what box had been clicked on
  });
} //addEventListenersToGameBoard does the following:Selects all elements with the class box using querySelectorAll.For each box element, it adds a click event listener.When a box is clicked, the event handler calls the playMove function, passing it the clicked element and the data parameter.This allows the game board (presumably a set of elements with the class box) to respond to user clicks and perform some action (defined in the playMove function) using the clicked element and any additional data provided.

function initialiseGame(data) {
  //initialisse game variables
  let displayTurnText =
    data.currentPlayer === "X" ? data.player1name : data.player2name;
  adjustDom("players-turn", `${data.player1name}'s turn`);
  initialiseVariables(data);
  //add event listeners to the gameboard
  addEventListenersToGameBoard(data);
}

function playMove(box, data) {
  //is game over? if game over, dont do anything
  if (data.gameOver || data.round > 8) {
    //this is the multiple ways a game can be over
    return;
  }
  //check if game box has a letter inside, if so dont do anything
  if (data.board[box.id] === "X" || data.board[box.id] === "0") {
    return;
  }

  //adjust the DOM for player move, and then check win conditions. the below makes the x or o visible in the box
  data.board[box.id] = data.currentPlayer;
  box.textContent = data.currentPlayer;
  //
  box.classList.add(data.currentPlayer === "X" ? "boxplayer1" : "boxplayer2"); //if current player is "x" then add player1 else add player2 this is a ternerary operator

  //increase the round number
  data.round++;

  console.log(box, data);

  //check end conditions
  if (endConditions(data)) {
    return;
  }

  //change current player
  //change the dom, and change data.currentplayer
  if (data.choice === 0) {
    changePlayer(data);
  } else if (data.choice === 1) {
    //easy AI
    aiMove(data);
    data.currentPlayer = "X";
    //change back to player 1
  } else if (data.choice === 2) {
    changePlayer(data);
  }
}

function endConditions(data) {
  //3 potential options
  //winner
  //tie
  //game not over yet
  if (checkWinner(data)) {
    //adjust the DOM to reflect win
    let winnerName =
      data.currentPlayer === "X" ? data.player1name : data.player2name;
    adjustDom("players-turn", winnerName + " has won the game");
    return true;
  } else if (data.round === 9) {
    adjustDom("displayTurn", "It's a Tie!");
    //adjust the DOM to reflect tie
    return true;
  }
  return false;
}

function checkWinner(data) {
  let result = false;
  winningConditions.forEach((condition) => {
    if (
      data.board[condition[0]] === data.board[condition[1]] &&
      data.board[condition[1]] === data.board[condition[2]]
    ) {
      data.gameOver = true; //this stops the user from being able to select more tiles once somebody has won
      result = true;
    }
  });
  return result;
}

function adjustDom(className, textContent) {
  const elem = document.querySelector(`.${className}`);
  elem.setAttribute("display", "block");
  elem.textContent = textContent;
}

function changePlayer(data) {
  data.currentPlayer = data.currentPlayer === "X" ? "O" : "X"; // this means that if current player is X then change i to O, otherwise change it to X
  //adjust the dom
  let displayTurnText =
    data.currentPlayer === "X" ? data.player1name : data.player2name;
  adjustDom("players-turn", `${displayTurnText}'s turn`);
}

function aiMove(data) {
  changePlayer(data);
  let availableSpaces = data.board.filter(
    (space) => space !== "X" && space !== "O"
  );
  let move =
    availableSpaces[Math.floor(Math.random() * availableSpaces.length)];

  // Update the board and UI for the AI's move
  data.board[move] = data.player2;
  let box = document.getElementById(`${move}`);

  if (box) {
    // Ensure the element exists
    box.textContent = data.player2;
    box.classList.add("boxplayer2");
  } else {
    console.error(`Element with ID ${move} not found`);
  }

  // Check end conditions after AI move
  if (endConditions(data)) {
    return;
  }
  // Switch back to the other player
  changePlayer(data);
}
