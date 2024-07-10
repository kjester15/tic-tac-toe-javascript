// board object/module
const BoardGame = (function() {
  const boardArray = [...Array(3)].map(e => Array(3));
  const pieces = ['X', 'O']
  const playerOne = GamePlay.createPlayer(1);
  const playerTwo = GamePlay.createPlayer(2);
  const players = [playerOne, playerTwo]; 

  return { boardArray, pieces, players};
})();

// gameplay object/module
const GamePlay = (function() {
  let playerTurn = 0;

  const createPlayer = (number) => {
    playerName = prompt(`What is player ${number}'s name?`)
    const player = new Player(playerName, BoardGame.pieces[number - 1]);
    return player;
  };

  const updatePlayer = () => {
    if (playerTurn == 0) {
      playerTurn++;
    } else {
      playerTurn--;
    }
  };

  // for now use grid of 012-012 - will change once implemented in browser
  const processMove = (input) => {
    const move = [input.at(0), input.at(1)]
    return move;
  };

  const movePiece = (move) => {
    BoardGame.boardArray[move[0]][move[1]] = BoardGame.pieces[playerTurn];
  };

  const checkHorizontal = () => {
    const playerPiece = BoardGame.pieces[playerTurn];
    // check for horizontal wins
    for (let i = 0; i < 3; i++) {
      let tokenCount = 0;
      for (let j = 0; j < 3; j++) {
        if (BoardGame.boardArray[i][j] != playerPiece) {
          tokenCount = 0;
          break;
        } else {
          tokenCount++;
        }
        if (tokenCount == 3) {
          return true;
        }
      };
    };
  };

  const checkVertical = () => {
    const playerPiece = BoardGame.pieces[playerTurn];
    // check for verticle wins
    for (let j = 0; j < 3; j++) {
      let tokenCount = 0;
      for (let i = 0; i < 3; i++) {
        if (BoardGame.boardArray[i][j] != playerPiece) {
          tokenCount = 0;
          break;
        } else {
          tokenCount++;
        }
        if (tokenCount == 3) {
          return true;
        }
      };
    };
  };

  const checkDiagonal = () => {
    const playerPiece = BoardGame.pieces[playerTurn];
    // check for first diagonal wins
    for (let i = 0; i < 3; i++) {
      let tokenCount = 0;
      if (BoardGame.boardArray[i][i] != playerPiece) {
        tokenCount = 0;
        break;
      } else {
        tokenCount++;
      }
      if (tokenCount == 3) {
        return true;
      }
    };
    // check for second diagonal wins
    for (let i = 0; i < 3; i++) {
      let tokenCount = 0;
      for (let j = 2; j > -1; j--) {
        if (BoardGame.boardArray[i][j] != playerPiece) {
          tokenCount = 0;
          break;
        } else {
          tokenCount++;
        }
        if (tokenCount == 3) {
          return true;
        }
      };
    };
  };

  const checkWin = () => {
    if (checkHorizontal() == true) {
      return true;
    } else if (checkVertical() == true) {
      return true;
    } else if (checkDiagonal() == true) {
      return true;
    } else {
      return false;
    }
  };

  return {
    createPlayer,
    updatePlayer,
    processMove,
    movePiece,
    checkHorizontal,
    checkVertical,
    checkDiagonal,
    checkWin,
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

let win = false;
while (win == false) {
  let move = GamePlay.processMove(prompt("move where? 1-3, 1-3 (ex. 11)"));
  GamePlay.movePiece(move);
  win = GamePlay.checkWin();
  GamePlay.updatePlayer();
  DisplayController.displayBoard();
}
console.log("Game over!");