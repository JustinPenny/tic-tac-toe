import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


export default function GameBoard(){

    const [gameBoard, setGameBoard] = useState(initialGameBoard);


    // in JS you should create a deep copy of an array instead of trying to edit the original directly
    // Similar reasoning as to why you pass a function instead of the old state as a variable. Passing a reference is safer 
    // This is updating the state in an immutable way and is best practice
    function handleSelectedSquare(rowIndex, colIndex){
        setGameBoard((prevGameBoard)=>{
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        });
    }

    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex)=> (
                <li key={rowIndex}>
                    <ol>
                    {row.map((playerSymbol, colIndex)=> (
                        <li key={colIndex}>
                            <button onClick={() => handleSelectedSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}