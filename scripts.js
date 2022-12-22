const gameBoard = (() => {

  let board = [0,1,2,3,4,5,6,7,8];
  let gameObj = {};

  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const initializeGameVars = (game) => {
    // Add variables to the game object
    game.marks = ["X", "O"];

    // playerTurn alternates between 0 and 1, and is used as the index number for marks
    game.playerTurn = 0;
    game.turns = 0;
    return game
  }

  const playerMove = (event) => {
    // Each div has a class corresponding to an array index,
    // If the current array item is NOT an integer, it will be overwritten with a player piece
    if (!isNaN(board[event.target.classList[0]])) {
      if (gameObj.playerTurn === 0) {
        displayController.announce(gameObj.player2 + "'s turn!");
        // Append the current players mark in the array index
        // and update the textContent of the div
        board[event.target.classList[0]] = gameObj.marks[0];
        event.target.textContent = gameObj.marks[0];
        ++gameObj.turns;
      } else if (gameObj.playerTurn === 1) {
        displayController.announce(gameObj.player1 + "'s turn!");
        board[event.target.classList[0]] = gameObj.marks[1];
        event.target.textContent = gameObj.marks[1]
        ++gameObj.turns;
      }
    }
    checkForWinner();
  }

  const checkForWinner = () => {
    // Check for a winner, and if no winner is found, switch
    // which player's turn it is
    for (let i = 0; i < winningMoves.length; i++) {
      if (board[winningMoves[i][0]] === board[winningMoves[i][1]] &&
          board[winningMoves[i][1]] === board[winningMoves[i][2]]) {
            board[winningMoves[i][0]] === "X" ? 
            displayController.announce(gameObj.player1 + " wins!") :
            displayController.announce(gameObj.player2 + " wins!");
            // Reset board
            board = [0,1,2,3,4,5,6,7,8];
            return displayController.resetGame();
      }
    }
    if (gameObj.turns > 8) {
      displayController.announce("It was a tie!");
      board = [0,1,2,3,4,5,6,7,8];
      return displayController.resetGame();
    }
    // Switch turns if no winner is found, and the game isn't yet a tie
    switchTurns();
  }

  const switchTurns = () => {
    // Alternate turns
    gameObj.playerTurn  === 0 ? ++gameObj.playerTurn : --gameObj.playerTurn;
  }

  const startGame = (game) => {
    // Hide modal
    const modalDivs = document.querySelectorAll(".close-modal");
    modalDivs.forEach((div) => {div.style.visibility = "hidden";});
    // Add variables to the gameObject
    displayController.squareDivs.forEach((div) => {div.textContent = ""});
    gameObj = Object.assign(gameObj, initializeGameVars(game));
    displayController.announce(game.player1 + "'s turn!");
  }

  return {board, playerMove, startGame}
})();

const displayController = (() => {

  let squareDivs = document.querySelectorAll(".square");
  let form = document.querySelector("form");
  let announceDiv = document.querySelector(".announcer");

  const resetGame = () => {
    // Bring back the modal to start a new game
    const modalDivs = document.querySelectorAll(".close-modal");
    modalDivs.forEach((div) => {div.style.visibility = "visible";});
    // Replace form with a clone to remove the old eventListener
    form = form.cloneNode(true);
    setupEventListeners();
  }

  const announce = (text) => {
    // Change the text above the gameboard
    announceDiv.textContent = text;
  }

  // Setup event listeners
  const setupEventListeners = () => {
    // Player square selection
    squareDivs.forEach((div) => {
      div.addEventListener("click", gameBoard.playerMove)
    })
    // Form submit listener
    form.addEventListener("submit", (event) => {
      // Prevent page refresh from submitting form
      event.preventDefault();

      // Create a gameObject containing the player names
      const formData = new FormData(event.target);
      const gameObject = Object.fromEntries(formData);
      gameBoard.startGame(gameObject);
    })
  };
  
  return {resetGame, announce, squareDivs, setupEventListeners};
})();

displayController.setupEventListeners();