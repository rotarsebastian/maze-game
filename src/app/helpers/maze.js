import React from 'react';
import Flag from './../components/Game/GameParts/Flag';
import SqureBox from './../components/Game/GameParts/SquareBox';
import { getMaze, movePony } from './../api/api';

// ====================== REGISTERED KEYS ======================
const escapeKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 's'];

// ====================== GET BOX BORDERS ======================
export const addBoxBorders = (borders, x, y, width, distance) => {

    // ====================== ELEMENT AND NEIGHBOURS ======================
    const element = borders[width * y + x];
    const nextElement = borders[width * y + x + 1];
    const bottomElement = borders[width * (y + 1) + x];

    let elementString = element.toString(); 

    // ====================== ADD RIGHT BORDER IF NEXT ELEMENT HAS WEST ======================
    if(nextElement) {
        if(nextElement.indexOf('west') >= 0) {
            if(elementString.length > 0) elementString += ',east';
                else elementString += 'east';
        }
    } 

    // ====================== HANDLE LAST MATRIX ELEMENT ======================
    else if(elementString.length > 0) elementString += ',east';
    else elementString += 'east';

    // ====================== ADD BOTTOM BORDER IF ELEMENT ON BOTTOM HAS NORTH ======================
    if(bottomElement) {
        if(bottomElement.indexOf('north') >= 0) {
            if(elementString.length > 0) elementString += ',south';
                else elementString += 'south';
        }
    }

    // ====================== HANDLE LAST MATRIX ROW ====================== 
    else if(elementString.length > 0) elementString += ',south';
    else elementString += 'south';

    // ====================== HANDLE ELEMENT WITH NO BORDERS ====================== 
    if(elementString.length === 0) elementString += 'none';

    // ====================== RETURN BOX STYLES ======================
    switch (elementString) {
        case 'none':
            return { strokeDasharray: `0, ${distance * 4}` };
        case 'north':
            return { strokeDasharray: `${distance}, ${distance * 3}` };
        case 'west':
            return { strokeDasharray: `0, ${distance * 3}, ${distance}` };
        case 'south':
            return { strokeDasharray: `0, ${distance * 2}, ${distance}, ${distance}` };
        case 'east':
            return { strokeDasharray: `0, ${distance}, ${distance}, ${distance * 2}` };
        case 'west,north':
            return { strokeDasharray: `${distance}, ${distance}, 0` };
        case 'west,east':
            return { strokeDasharray: `0, ${distance}, ${distance}, ${distance}, ${distance}` };
        case 'west,south':
            return { strokeDasharray: `0, ${distance * 2}, ${distance * 2}` };
        case 'west,north,east':
            return { strokeDasharray: `${distance * 2}, ${distance}, ${distance}` };
        case 'west,north,south':
            return { strokeDasharray: `${distance}, ${distance}, ${distance * 2}` };
        case 'west,east,south':
            return { strokeDasharray: `0, ${distance}, ${distance * 3}, ${distance}` };
        case 'north,south':
            return { strokeDasharray: `${distance}` };
        case 'north,east':
            return { strokeDasharray: `${distance * 2}, ${distance * 2}` };
        case 'north,east,south':
            return { strokeDasharray: `${distance * 3}, ${distance}` };
        case 'east,south':
            return { strokeDasharray: `0, ${distance}, ${distance * 2}, ${distance}` };
        default:
            break;
    }
    
};

// ====================== CREATE INITIAL MAZE ======================
export const createMaze = (mazeData, start, distance) => {
    const { size, data: borders, pony, domokun, 'end-point': exit } = mazeData;
        
    const matrixBoxes = [], ponyAndDomokun = [];
    const [ width, height ] = size;

    let exitFlag;

    // ====================== ADD EVERY BOX FOR EVERY COLUMN ======================
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            // ====================== ADD BOXES WITH BORDERS ======================
            matrixBoxes.push(
                <SqureBox 
                    key={`box_${x}_${y}`}
                    borders={addBoxBorders(borders, x, y, width, distance)}
                    x={x} 
                    y={y} 
                    start={start - ( distance / 2 )} 
                    distance={distance}
                    width={width} 
                />
            );

            // ====================== ADD PONY ======================
            if(width * y + x === pony[0]) { 
                ponyAndDomokun.push(
                    <Flag 
                        key={`flag_${x}_${y}`}
                        x={x} 
                        y={y}
                        start={start - ( distance / 2 )} 
                        distance={distance}
                        flag={'Pony'}
                    />
                );
            } 
            
            // ====================== ADD DOMOKUN ======================
            else if (width * y + x === domokun[0]) {
                ponyAndDomokun.push(
                    <Flag 
                        key={`flag_${x}_${y}`}
                        x={x} 
                        y={y}
                        start={start - ( distance / 2 )} 
                        distance={distance}
                        flag={'Domokun'}
                    />
                );
            } 
            
            // ====================== ADD EXIT ======================
            else if (width * y + x === exit[0]) {
                exitFlag = <Flag 
                    key={`flag_${x}_${y}`}
                    x={x} 
                    y={y}
                    start={start - ( distance / 2 )} 
                    distance={distance}
                    flag={'Exit'}
                />;
            } 
        }
    }

    return { matrixBoxes, ponyAndDomokun, exitFlag };
}

// ====================== UPDATE MAZE DATA ======================
export const updateMaze = async(key, mazeId, width, start, distance) => {

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

                // ====================== GET THE NEW POSITIONS FOR PONY AND DOMOKUN ======================
                const ponyNewPosition = updatedMaze.data.pony[0];
                const domokunNewPosition = updatedMaze.data.domokun[0];

                // ====================== CALCULATE THE NEW X AND Y ======================
                const newPonyY = Math.floor(ponyNewPosition / width);
                const newPonyX = ponyNewPosition % width;

                const newDomokunY = Math.floor(domokunNewPosition / width);
                const newDoomokunX = domokunNewPosition % width;

                // ====================== CREATE NEW PONY AND DOMOKUN DATA ======================
                const ponyAndDomokunData = [ 
                    {
                        name: 'Pony',
                        x: newPonyX,
                        y: newPonyY,
                    },
                    {
                        name: 'Domokun',
                        x: newDoomokunX,
                        y: newDomokunY,
                    } 
                ];

                // ====================== CREATE THE COMPONENTS ARRAY ======================
                const newPonyAndDomokun = ponyAndDomokunData.map(flag => 
                    <Flag 
                        key={`flag_${flag.x}_${flag.y}`}
                        x={flag.x} 
                        y={flag.y}
                        start={start - ( distance / 2 )} 
                        distance={distance}
                        flag={flag.name}
                    />
                );

                // ====================== RETURN NEW DATA BACK ======================
                return { status: 1, newPonyAndDomokun, gameStatus: updatedMaze.data['game-state'] };
            }
        }
    } else return { status: 0 }; // RETURN 0 IF ANY OTHER KEY IS PRESSED
}
