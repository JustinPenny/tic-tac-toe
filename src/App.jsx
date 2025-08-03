import { useState } from 'react';

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
function App() {
  
  // If two components rely on a shared state hook you must lift the state to the parent component 
  // In this instance both the gameboard and the player component need the state of the game so we must use the parent App component to manage it
  // Now the active player is passed to both components so they each know whose turn it is 
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectedSquare(){
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
       <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>
        <GameBoard onSelectSquare={handleSelectedSquare} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  );
}

export default App
