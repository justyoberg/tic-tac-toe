// Factory for creating players
const playerFactory = () => {

  const winner = false;
  const marker = null;

  return {winner, marker};
};

// Module for the Gameboard object
const gameBoard = (() => {

  // Gameboard array
  const board = ["", "", "", "", "", "", "", "", ""];

  // Update the Gameboard with a player's move
  const updateBoard = (event) => {

    let square = event.target.classList[0];

    if (board[square] == "" && game.turn == 1) {
      board[square] = game.player1.marker;
      game.turn = 2;
    } else if (board[square] == "" && game.turn == 2) {
      board[square] = game.player2.marker;
      game.turn = 1;
    } else {
      console.log("Invalid move!");
    };
    displayController.renderBoard();
  };

  return {board, updateBoard};
})();

// Module for rendering the Gameboard and making moves
const displayController = (() => {

  const squareDivs = document.querySelectorAll(".square");
  const announcements = document.querySelector(".announce");

  // Render the gameboard to each respective HTML div
  const renderBoard = () => {
    squareDivs.forEach((square) => {
      square.textContent = gameBoard.board[square.classList[0]]
    });
  }

  const setupListeners = () => {
    squareDivs.forEach((div) => {
      div.addEventListener("click", gameBoard.updateBoard);
    })
  };

  return {renderBoard, setupListeners, announcements};
})();

const game = (() => {

  const player1 = playerFactory();
  const player2 = playerFactory();
  let turn = 0;

  const whoGoesFirst = () => {

    if (Math.random() < 0.5) {
      player1.marker = "X";
      game.turn = 1;
      player2.marker = "O";
    } else {
      player1.marker = "O";
      player2.marker = "X";
      game.turn = 2;
    }

  };

  const playGame = () => {

    whoGoesFirst();
    displayController.setupListeners();
    displayController.renderBoard();

  };

  return {playGame, player1, player2, turn};
})();

game.playGame();