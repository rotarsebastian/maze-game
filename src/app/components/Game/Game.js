import React, { useEffect, useState } from 'react';
import { getMaze } from './../../api/api';
import classes from './Game.module.css';
import { createMaze, updateMaze } from './../../helpers/maze';
import useEventListener from '@use-it/event-listener';
import Coordinates from './GameParts/Coordinates';
import GameStatus from './GameParts/GameStatus';
import GameResults from './GameParts/GameResults';
import ClipLoader from 'react-spinners/ClipLoader';

// ====================== SVG DISTANCE BETWEEN BOXES AND STARTING POINT ======================
const distance = 35;
const start = 50;

const Game = ({ id: mazeId }) => {

    // ====================== STATE VALUES ======================
    const [ sizes, setSizes ] = useState(undefined);
    const [ gameStatus, setGameStatus ] = useState(undefined);
    const [ exit, setExit ] = useState(undefined);
    const [ matrixBoxes, setMatrixBoxes ] = useState(undefined);
    const [ ponyAndDomokun, setPonyAndDomokun ] = useState(undefined);
    const [ isLoaded, setIsLoaded ] = useState(false);
    
    // ====================== FETCH INITIAL DATA ======================
    useEffect(() => {
        const fetchMaze = async() => {
            const response = await getMaze(mazeId);
            if(response.status === 1) {
                const { size, 'game-state': gameStatus} = response.mazeData;
                setSizes(size);
                setGameStatus(gameStatus);
                initializeMaze(response.mazeData);
                setIsLoaded(true);
            }
        }

        // ====================== LOAD INITIAL DATA ======================
        if(!sizes) fetchMaze();
    }); 

    // ====================== GET INITIAL DATA - SET MAZE ======================
    const initializeMaze = mazeData => {
        const mazeElements = createMaze(mazeData, start, distance);

        setExit(mazeElements.exitFlag);
        setMatrixBoxes(mazeElements.matrixBoxes);
        setPonyAndDomokun(mazeElements.ponyAndDomokun);
    }

    // ====================== SET SVG VIEWBOX ======================
    const getSvgViewBox = (width, height) => {
        let viewBox = '0 0 565 565';

        if(width > 20 || height > 20) viewBox = '0 0 925 925';
        else if(width > 18 || height > 18) viewBox = '0 0 765 765';
        else if(width > 16 || height > 16) viewBox = '0 0 665 665';
        else if(width > 15 || height > 15) viewBox = '0 0 605 605';

        return viewBox;
    }

    // ====================== UPDATE MAZE ======================
    const handleUpdateMaze = async({ key }) => {
        const [ width ] = sizes;
        const updatedMaze = await updateMaze(key, mazeId, width, start, distance);

        if(updatedMaze.status === 1) {
            setGameStatus(updatedMaze.gameStatus);
            setPonyAndDomokun(updatedMaze.newPonyAndDomokun);
        }
    }

    // ====================== ATTACH LISTENER FOR KEY PRESS ======================
    useEventListener('keydown', handleUpdateMaze);
    
    // ====================== SHOW LOADER BEFORE GETTING THE DATA ======================
    if(!isLoaded) return <div className={classes.Loading}><ClipLoader size={50} color={'#289eda'} /></div>

    // ====================== SHOW GAME RESULTS - IF GAME IS OVER ======================
    if(gameStatus.state === 'over' || gameStatus.state === 'won') return <GameResults status={gameStatus} />

    // ====================== DATA LOADED - GET WIDTH AND HEIGHT ======================
    const [ width, height ] = sizes;

    // ====================== SVG VIEWBOX ENDPOINTS ======================
    const viewBox = getSvgViewBox(width, height);
    
    // ====================== ADD X COORDINATES ======================
    const coordinatesX = Array(width).fill('').map((el, index) =>
        <Coordinates 
            key={index + 'x'} 
            x={index} 
            y={-1} 
            index={index}
            start={start} 
            distance={distance} 
        />
    );
            
    // ====================== ADD Y COORDINATES ======================
    const coordinatesY = Array(height).fill('').map((el, index) => 
        <Coordinates 
            key={index + 'y'} 
            x={-1} 
            y={index} 
            index={index} 
            start={start} 
            distance={distance} 
        />
    );

    // ====================== JSX ======================
    return (
        <React.Fragment>
            <div className={classes.SvgWrapper}>
                <svg className={classes.SvgElem} viewBox={viewBox}>
                    { coordinatesX }
                    { coordinatesY }
                    { matrixBoxes }
                    { exit }
                    { ponyAndDomokun }
                </svg>
            </div>
            <GameStatus status={gameStatus} />
        </React.Fragment>
    )
}

export default Game;