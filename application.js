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
    BoardGame.playerOne = GamePlay.createPlayer(1);
    BoardGame.playerTwo = GamePlay.createPlayer(2);
    BoardGame.players = [BoardGame.playerOne, BoardGame.playerTwo];
    DisplayController.displayBoard(BoardGame.boardArray);
  };

  const createPlayer = (number) => {
    playerName = prompt(`What is player ${number}'s name?`)
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
    return continueGamePlay(move);
  };

  const movePiece = (move) => {
    BoardGame.boardArray[move[0]][move[1]] = BoardGame.pieces[playerTurn];
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

  const continueGamePlay = (move) => {
    GamePlay.movePiece(move);
    // let win = GamePlay.checkWin();
    GamePlay.updatePlayer();
    DisplayController.clearBoard()
    DisplayController.displayBoard(BoardGame.boardArray);
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
    playerTurn,
    returnPlayer,
    continueGamePlay,
  };
})();

// display the board in the terminal, then later in the browser
const DisplayController = (function () {
  const clearBoard = ()=> {
    document.getElementById("board").innerHTML = "";
  };

  const displayBoard = (array) => {
    array.forEach((row, i) => {
      for(var j = 0; j < 3; j++) {
        const newTile = document.createElement("button");
        if (BoardGame.boardArray[i][j] == null) {
          newTile.innerHTML = "";
        } else {
          newTile.innerHTML = BoardGame.boardArray[i][j];
        }
        newTile.setAttribute("id", `tile-${i}${j}`);
        document.getElementById("board").appendChild(newTile);
        // add event listener to button
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

GamePlay.setupGame();

// let win = false;
// while (win == false) {
//   let move = GamePlay.processMove()
  // let move = GamePlay.processMove(prompt(`${GamePlay.returnPlayer()}, move where? 1-3, 1-3 (ex. 11)`));
//   GamePlay.movePiece(move);
//   win = GamePlay.checkWin();
//   GamePlay.updatePlayer();
//   DisplayController.displayBoard(BoardGame.boardArray);
// }
// console.log("Game over!");