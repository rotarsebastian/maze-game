import React from 'react';
import classes from './../Game.module.css';
import { useHistory } from 'react-router-dom';

const GameResults = props => {
    
    const history = useHistory();

    const { 'state-result': finalResult } = props.status;

    return (
        <div className={classes.GameResults}>
            <h2>Result: { finalResult }</h2>
            <button onClick={() => history.push('/play')} className="PlayButton">Play again</button>
        </div>
    )
}

export default GameResults;