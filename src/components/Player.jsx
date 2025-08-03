import { useState } from "react";
export default function Player({initialName, symbol, isActive}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);


    function handleEditClick(){
        // setIsEditing(!isEditing); // This is not best practice. When updating state based on previous value of state you should pass a function to the state update

        setIsEditing( (editing) => !editing); // looks the same as above but is best practice per React man pages
                                              // Since React schedules state updates doing raw value assigns can hit race conditions in extreme situations
    }

    function handleChange(event){
        setPlayerName(event.target.value);
        // .target refers to the element that emitted the event. <input> in this case
        // .target points to <input> and input has a .value property which is the value being entered into the field
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let buttonCaption = 'Edit';

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
        buttonCaption = 'Save';
    }

    return(     
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        
        <span className="player-symbol">{symbol}</span>
      </span>
        <button onClick={handleEditClick}>{buttonCaption}</button>
    </li>
    );

}