import React from 'react';
import classes from '../Game.module.css';

// ====================== ADD MAZE BOXES ======================
const SqureBox = props => 
    <rect 
        x={props.start + props.x * props.distance} 
        y={props.start + props.y * props.distance} 
        width={`${props.distance}`} 
        height={`${props.distance}`} 
        className={classes.Box + ` ${props.width * props.y + props.x}`}
        style={props.borders}
    />

export default SqureBox;