import React from 'react';
import { ReactComponent as Pony } from './../../../assets/img/pony-logo.svg';
import { ReactComponent as Domokun } from './../../../assets/img/domokun.svg';
import { ReactComponent as Exit } from './../../../assets/img/exit.svg';

const Flag = props => {

    let flag;
    
    if(props.flag === 'pony') flag = <Pony />;
    if(props.flag === 'D') flag = <Domokun />;
    if(props.flag === 'E') flag = <Exit />;

    // ====================== ADD EXIT AND DOMOKUN ======================
    return (
        <svg 
            x={props.start + props.x * props.distance + props.distance / 7} 
            y={props.start + props.y * props.distance + props.distance / 5.5} 
            height={props.distance / 2 + props.distance / 4} 
            width={props.distance / 2 + props.distance / 4}
            viewBox="0 0 64 64" 
        >
            {flag}
        </svg>
    );

} 

export default Flag;