import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classes from './Play.module.css';
import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { createMaze } from './../../api/api';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';

// ====================== STYLES ======================
const Select = withStyles({
    root: {
       width: '35%',
       background: '#fff!important',
       '& > div': {
            '&::before': {
                borderBottom: '1px solid var(--purple)!important',
            },

            '&::after': {
                borderBottom: '1px solid var(--blue)!important',
            },

            '& .MuiSelect-root': {
                background: '#fff!important',
            },

            '& > div > div': {
                paddingLeft: '14px',
                color: 'var(--grey)',
            },

            '& svg': {
                right: '.5rem'
            }
       },
       '& label': {
            width: '135%',
            color: 'var(--grey)',
            textAlign: 'center',
            paddingRight: '.45rem',
       },
       '& label.Mui-focused': {
            color: 'var(--blue)',
        }
    }
})(TextField);

const PonyName = withStyles({
    root: {
        '& > span': {
            color: 'var(--grey)',
            fontFamily: '"Quicksand Regular", "sans-serif" !important',
            '& > span': {
                '& svg': {
                    fill: 'var(--purple)',
                    fontSize: '20px'
                }
            }
        }
    }
})(FormControlLabel);

const Play = () => {

    const history = useHistory();

    // ====================== DATA AND SETTERS ======================
    const [ dimensions, setDimensions ] = useState([ 15, 15 ]);
    const [ ponyName, setPonyName ] = useState('fluttershy');
    const [ difficulty, setDifficulty ] = useState(1);
    const [ loadingButton, setLoadingButton ] = useState(false);

    // ====================== GET EVERY OPTION FOR SELECT ======================
    const getMenuItems = (from, length) => 
        Array(length).fill('').map((item, index) => 
        <MenuItem key={from + index} value={from + index}>{from + index}</MenuItem>)

    // ====================== CREATE A GAME ======================
    const handleStartGame = async() => {
        setLoadingButton(true);
        const requestObject = {
            'maze-width': dimensions[0],
            'maze-height': dimensions[1],
            'maze-player-name': ponyName,
            'difficulty': difficulty
        }
        
        const response = await createMaze(requestObject);
        setLoadingButton(false);

        if(response.status  === 1) history.push(`/play/${response.data.maze_id}`);
    }

    return (
        <React.Fragment>
            <div className={classes.PlayContainer}>
                <div className="Title">Welcome to PonyGame!</div>
                
                {/* ====================== DIMENSIONS ====================== */}
                <div className={`${classes.Label} ${classes.First}`}>Maze dimensions</div>
                <div className={classes.DimensionsContainer}>
                    <Select 
                        id="outlined-select-width"
                        select
                        label="Width" 
                        value={dimensions[0]}
                        onChange={e => setDimensions([ e.target.value, dimensions[1] ])}
                    >
                        { getMenuItems(15, 11) }
                    </Select>

                    <Select 
                        id="outlined-select-height"
                        select
                        label="Height" 
                        value={dimensions[1]}
                        onChange={e => setDimensions([ dimensions[0], e.target.value ])}
                    >
                        { getMenuItems(15, 11) }
                    </Select>
                </div>

                {/* ====================== PONY NAME ====================== */}
                <div className={classes.Label}>Pony name</div>
                <RadioGroup 
                    aria-label="pony name"
                    className={classes.RadioContainer}
                    name="maze-player-name"
                    value={ponyName} 
                    onChange={e => setPonyName(e.target.value)}>
                    <PonyName value="fluttershy" control={<Radio />} label="Fluttershy" />
                    <PonyName value="pinkie pie" control={<Radio />} label="Pinkie Pie" />
                </RadioGroup>

                {/* ====================== DIFFICULTY ====================== */}
                <div className={classes.Label}>Difficulty</div>
                <Select 
                    id="outlined-select-difficulty"
                    select
                    label="1 - 10" 
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                >
                    { getMenuItems(1, 10) }
                </Select>

                {/* ====================== PLAY ====================== */}
                <button className="PlayButton" type="button" onClick={handleStartGame} disabled={loadingButton}>
                    { loadingButton ? <ClipLoader size={15} color={'#fff'} /> : 'Play' }
                </button>

            </div>
        </React.Fragment>
    )
}

export default Play;