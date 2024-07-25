let announcement = document.getElementById("announcement");

// board object/module
const BoardGame = (function() {
  const boardArray = [...Array(3)].map(e => Array(3));
  const pieces = ['X', 'O']
  let playerOne;
  let playerTwo;
  const players = []; 

  return { boardArray, pieces, playerOne, playerTwo, players};
})();

// gameplay object/module
const GamePlay = (function() {
  let playerTurn = 0;

  const setupGame = () => {
    DisplayController.clearBoard()
    BoardGame.boardArray = [...Array(3)].map(e => Array(3));
    GamePlay.playerTurn = 0;
    BoardGame.playerOne = GamePlay.createPlayer(1);
    BoardGame.playerTwo = GamePlay.createPlayer(2);
    BoardGame.players = [BoardGame.playerOne, BoardGame.playerTwo];
    DisplayController.displayBoard(BoardGame.boardArray);
    announcement.innerHTML = `${BoardGame.players[playerTurn].name}, YOUR TURN!`
  };

  const createPlayer = (number) => {
    playerName = prompt(`WHAT IS PLAYER ${number}s NAME?`).toUpperCase();
    const player = new Player(playerName, BoardGame.pieces[number - 1]);
    return player;
  };

  const returnPlayer = () => {
    let player = BoardGame.players[playerTurn].name;
    return player;
  };

  const updatePlayer = () => {
    if (playerTurn == 0) {
      playerTurn++;
    } else {
      playerTurn--;
    }
  };

  const processMove = (element) => {
    let id = element.id.split("");
    let column = id.pop();
    let row = id.pop();
    const move = [row, column]
    if (BoardGame.boardArray[move[0]][move[1]] != null) {
      return;
    }
    return continueGamePlay(move);
  };

  const movePiece = (move) => {
    if (BoardGame.boardArray[move[0]][move[1]] == null) {
      BoardGame.boardArray[move[0]][move[1]] = BoardGame.pieces[playerTurn];
      valid = true;
    }
  };

  const checkHorizontal = () => {
    const playerPiece = BoardGame.pieces[playerTurn];
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
    let tokenCount = 0;
    for (let i = 0; i < 3; i++) {
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
    tokenCount = 0;
    let j = 0;
    for (let i = 2; i > -1; i--) {
      if (BoardGame.boardArray[j][i] != playerPiece) {
        tokenCount = 0;
        break;
      } else {
        tokenCount++;
      }
      if (tokenCount == 3) {
        return true;
      }
      j++;
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

  const endGame = () => {
    let tiles = document.querySelectorAll('[id^="tile"]');
    Array.from(tiles).forEach((element) => {
      element.disabled = true;
      console.log(element)
    });
    announcement.innerHTML =`${BoardGame.players[playerTurn].name} WINS!`;
  };

  const continueGamePlay = (move) => {
    GamePlay.movePiece(move);
    let win = GamePlay.checkWin();
    DisplayController.clearBoard()
    DisplayController.displayBoard(BoardGame.boardArray);
    if (win == true) {
      GamePlay.endGame();
      return;
    }
    GamePlay.updatePlayer();
    announcement.innerHTML = `${BoardGame.players[playerTurn].name}, YOUR TURN!`
  };

  return {
    setupGame,
    createPlayer,
    updatePlayer,
    processMove,
    movePiece,
    checkHorizontal,
    checkVertical,
    checkDiagonal,
    checkWin,
    endGame,
    playerTurn,
    returnPlayer,
    continueGamePlay,
  };
})();

const DisplayController = (function () {
  const clearBoard = ()=> {
    document.getElementById("board").innerHTML = "";
  };

  const displayBoard = (array) => {
    array.forEach((row, i) => {
      for(var j = 0; j < 3; j++) {
        const newTile = document.createElement("button");
        if (BoardGame.boardArray[i][j] == 'X') {
          newTile.setAttribute("class", "playerOne");
        } else if (BoardGame.boardArray[i][j] == 'O') {
          newTile.setAttribute("class", "playerTwo");
        }
        newTile.setAttribute("id", `tile-${i}${j}`);
        document.getElementById("board").appendChild(newTile);
        newTile.addEventListener("click", (event) => {
          GamePlay.processMove(event.target);
        });
      };
    });
  };

  return { clearBoard, displayBoard };
})();

// player object
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
};

let newGame = document.getElementById("new");
newGame.addEventListener("click", function() {
  GamePlay.setupGame();
});