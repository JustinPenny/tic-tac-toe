import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations'
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from './components/Log';
import GameOver from './components/GameOver';

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  // We create our own currentPlayer var so that we don't try and use activePlayer and mix states
  if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveWinner(gameBoard, players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for(const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    } 
    return gameBoard;
}

function App() {
  
  // If two components rely on a shared state hook you must lift the state to the parent component 
  // In this instance both the gameboard and the player component need the state of the game so we must use the parent App component to manage it
  // Now the active player is passed to both components so they each know whose turn it is 
  //const [activePlayer, setActivePlayer] = useState('X');
  
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2', 
  })
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);


  // if 9 turns are player with no winner it's a draw
  const hadDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, 
          player: currentPlayer}, 
          ...prevTurns];
      
      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName // assign whatever symbol is passed to the new name on save
      };
    });
  }

  return (
    <main>
      <div id="game-container">
       <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
      </ol>
      {(winner || hadDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
