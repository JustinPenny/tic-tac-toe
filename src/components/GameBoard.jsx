const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


export default function GameBoard({onSelectSquare, turns}){
    let gameBoard = initialGameBoard;

    for(const turn of turns){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
    // in JS you should create a deep copy of an array instead of trying to edit the original directly
    // Similar reasoning as to why you pass a function instead of the old state as a variable. Passing a reference is safer 
    // This is updating the state in an immutable way and is best practice
    // function handleSelectedSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare(); // calls handleSelectedSquare in App component. Switches active player
    // }

    // The above code is commented out because we are going to lift this to the app component so it can be shared by the Log.jsx component

    return(
        <ol id="game-board">
            {gameBoard.map((row, rowIndex)=> (
                <li key={rowIndex}>
                    <ol>
                    {row.map((playerSymbol, colIndex)=> (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}