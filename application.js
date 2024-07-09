// board object/module
const BoardGame = (function() {
  const boardArray = [...Array(3)].map(e => Array(3));
  const pieces = ['X', 'O']
  const playerOne = new Player();
  const playerTwo = new Player();
  const players = [playerOne, playerTwo]; 

  return { boardArray, pieces, players};
})();

// gameplay object/module
const GamePlay = (function() {
  let playerTurn = 0;

  const createPlayer = (name, symbol) => {
    const player = new Player(name, symbol);
    return player;
  };

  const updatePlayer = () => {
    if (playerTurn == 0) {
      playerTurn++;
    } else {
      playerTurn--;
    };
  };

  // for now use grid of 012-012 - will change once implemented in browser
  const processMove = (input) => {
    const move = [input.at(0), input.at(1)]
    return move;
  };

  const movePiece = (move) => {
    BoardGame.boardArray[move[0]][move[1]] = BoardGame.pieces[playerTurn];
  };

  return {
    createPlayer,
    updatePlayer,
    processMove,
    movePiece,
  }
})();

// display the board in the terminal, then later in the browser
const DisplayController = (function () {
  const displayBoard = () => {
    console.log(BoardGame.boardArray.toString())
  };

  return { displayBoard };
})();


// player object
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
};

while (true) {
  let move = GamePlay.processMove(prompt("move where? ABC123"));
  GamePlay.movePiece(move);
  GamePlay.updatePlayer();
  DisplayController.displayBoard();
}