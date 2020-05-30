import React from 'react';
import classes from '../Game.module.css';

const GameStatus = props => {

    // ====================== CAPITALIZE WORD ======================
    const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

    const { state: gameStatus, 'state-result': lastMoveResult } = props.status;

    return (
        <React.Fragment>
            <div className={classes.GameStatus}>
                Game status:
                <b>{ capitalize(gameStatus) }</b>
            </div>

            <div className={classes.LastMove}>
                Last move result: 
                <b>{ lastMoveResult }</b>
            </div>

            <div className={classes.ControlsInfo}>
                Use keyboard <b>arrows</b> to move the poney and <b>S</b> key to stay on the same spot (Domokun will still chase you)
            </div>
        </React.Fragment>
    )
}

export default GameStatus;