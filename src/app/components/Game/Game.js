import React, { useEffect, useState } from 'react';
import { getMaze, movePony } from './../../api/api';
import classes from './Game.module.css';
import { getBorders } from './../../helpers/maze';
import useEventListener from '@use-it/event-listener';
import { useHistory } from 'react-router-dom';
import Coordinates from './GameParts/Coordinates';
import Flag from './GameParts/Flag';
import SqureBox from './GameParts/SquareBox';
import GameStatus from './GameParts/GameStatus';
import ClipLoader from 'react-spinners/ClipLoader';

// ====================== REGISTERED KEYS ======================
const escapeKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 's'];

// ====================== SVG DISTANCE BETWEEN BOXES AND STARTING POINT ======================
const distance = 35;
const start = 50;

const Game = ({ id: mazeId }) => {

    const history = useHistory();

    // ====================== WHOLE MAZE DATA ======================
    const [ mazeData, setMazeData ] = useState(undefined);
    
    // ====================== FETCH INITIAL DATA ======================
    useEffect(() => {
        const fetchMaze = async() => {
            const response = await getMaze(mazeId);
            if(response.status === 1) setMazeData(response.data);
        }

        if(!mazeData) fetchMaze();
    }, [mazeData, mazeId, setMazeData]); 

    // ====================== UPDATE PONY POSITION ======================
    const handleMovePony = async({ key }) => {

        // ====================== GET PRESSED KEY ======================
        if (escapeKeys.includes(key)) {

            // ====================== ASSIGN DIRECTION BASED ON THE PRESSED KEY ======================
            let direction;
            if(key === 'ArrowUp') direction = 'north';
            else if(key === 'ArrowRight') direction = 'east';
            else if(key === 'ArrowDown') direction = 'south';
            else if(key === 'ArrowLeft') direction = 'west';
            else if(key === 's') direction = 'stay';

            // ====================== MAKE REQUEST TO MOVE PONY ======================
            const result = await movePony(mazeId, { direction });
            if(result.status === 1) {

                // ====================== GET THE NEW MAZE DATA ======================
                const updatedMaze = await getMaze(mazeId);
                if(updatedMaze.status === 1) {

                    // ====================== UPDATE POSITIONS AND GAME STATE ======================
                    setMazeData({ 
                        ...mazeData, 
                        pony: updatedMaze.data.pony, 
                        domokun: updatedMaze.data.domokun,
                        'game-state': updatedMaze.data['game-state']
                    });
                }
            }
        }
    }
    // ====================== ATTACH LISTENER FOR KEY PRESS ======================
    useEventListener('keydown', handleMovePony);
    
    // ====================== WHILE LOADING INITIAL DATA ======================
    if(mazeData === undefined) return <div className={classes.Loading}><ClipLoader size={50} color={'#289eda'} /></div>

    // ====================== DATA LOADED - SPLIT DATA INTO SECTIONS ======================
    const { size, data: borders, pony, domokun, 'end-point': exit, 'game-state': gameStatus } = mazeData;

    // ====================== SHOW GAME RESULTS - IF GAME IS OVER ======================
    if(gameStatus.state === 'over' || gameStatus.state === 'won') return (
        <div className={classes.GameResults}>
            <h2>Result: { gameStatus['state-result'] }</h2>
            <button onClick={() => history.push('/play')} className="PlayButton">Play again</button>
        </div>
    )
    
    const squareBoxes = [], flags = []; 
    const [ width, height ] = size;

    // ====================== ADD EVERY BOX FOR EVERY COLUMN ======================
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            // ====================== ADD BOXES WITH BORDERS ======================
            squareBoxes.push(
                <SqureBox 
                    key={`box_${x}_${y}`}
                    borders={getBorders(borders, x, y, width, distance)}
                    x={x} 
                    y={y} 
                    start={start - ( distance / 2 )} 
                    distance={distance}
                    width={width} 
                />
            );

            // ====================== ADD PONY ======================
            if(width * y + x === pony[0]) { 
                flags.push(
                    <Flag 
                        key={`flag_${x}_${y}`}
                        x={x} 
                        y={y}
                        start={start - ( distance / 2 )} 
                        distance={distance}
                        flag={'Pony'}
                    />
                )
            } 
            
            // ====================== ADD DOMOKUN ======================
            else if (width * y + x === domokun[0]) {
                flags.push(
                    <Flag 
                        key={`flag_${x}_${y}`}
                        x={x} 
                        y={y}
                        start={start - ( distance / 2 )} 
                        distance={distance}
                        flag={'Domokun'}
                    />
                )
            } 
            
            // ====================== ADD EXIT ======================
            else if (width * y + x === exit[0]) {
                flags.push(
                    <Flag 
                        key={`flag_${x}_${y}`}
                        x={x} 
                        y={y}
                        start={start - ( distance / 2 )} 
                        distance={distance}
                        flag={'Exit'}
                    />
                )
            } 
        }
    }

    // ====================== ADD X COORDINATES ======================
    const coordinatesX = Array.from(new Array(width), (el, index) => {
        return (
            <Coordinates 
                key={index + 'width'} 
                x={index} 
                y={-1} 
                index={index}
                start={start} 
                distance={distance} 
            />
        );
    });
            
    // ====================== ADD Y COORDINATES ======================
    const coordinatesY = Array.from(new Array(height), (el, index) => {
        return (
            <Coordinates 
                key={index + 'height'} 
                x={-1} 
                y={index} 
                index={index} 
                start={start} 
                distance={distance} 
            />
        );
    });

    // ====================== SVG VIEWBOX ENDPOINTS ======================
    let viewBox = '0 0 565 565';

    if(size[0] > 20 || size[1] > 20) viewBox = '0 0 925 925';
    else if(size[0] > 18 || size[1] > 18) viewBox = '0 0 765 765';
    else if(size[0] > 16 || size[1] > 16) viewBox = '0 0 665 665';
    else if(size[0] > 15 || size[1] > 15) viewBox = '0 0 605 605';

    // ====================== JSX ======================
    return (
        <React.Fragment>
            <div className={classes.SvgWrapper}>
                <svg 
                    className={classes.SvgElem} 
                    viewBox={viewBox}
                >
                    { coordinatesX }
                    { coordinatesY }
                    { squareBoxes }
                    { flags }
                </svg>
            </div>
            <GameStatus status={gameStatus} />
        </React.Fragment>
    )
}

export default Game;