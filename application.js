// board object/module
const BoardGame = (function() {
  const boardArray = [...Array(3)].map(e => Array(3));
  const playerOne = new Player();
  const playerTwo = new Player();
  const players = [playerOne, playerTwo]; 
})();

// gameplay object/module
const GamePlay = (function() {
  let playerTurn = 1;
  const createPlayer = (name, symbol) => {
    const player = new Player(name, symbol);
    return player;
  };
  const updatePlayer = () => {
    console.log(`start ${playerTurn}`)
    if (playerTurn == 0) {
      playerTurn++;
    } else {
      playerTurn--;
    };
    console.log(`finish ${playerTurn}`)
  };
  return {
    createPlayer,
    updatePlayer,
  }
})();


// player object
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
};

GamePlay.updatePlayer()
// console.log(GamePlay.makeUppercase("hello"))