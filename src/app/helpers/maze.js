
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
