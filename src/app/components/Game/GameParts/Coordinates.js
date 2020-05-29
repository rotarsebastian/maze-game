import React from 'react';
import classes from '../Game.module.css';

// ====================== TABLE COORDINATES ======================
const Coordinates = props => {
    return (
        <text 
            x={props.start + props.x * props.distance} 
            y={props.start + props.y * props.distance} 
            className={classes.Numbers}
        >
            {props.index}
        </text>
    );
} 

export default Coordinates;