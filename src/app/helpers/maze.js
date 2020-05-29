
// ====================== GET BOX BORDERS ======================
export const getBorders = (borders, x, y, width, distance) => {

    // ====================== ELEMENT AND NEIGHBOURS ======================
    const element = borders[width * y + x];
    const nextElement = borders[width * y + x + 1];
    const bottomElement = borders[width * (y + 1) + x];
    const prevElement = borders[width * y + x - 1];

    let elementString = element.toString();

    if(nextElement) {
        if(nextElement % width !== 0) {
            if(nextElement.indexOf('west') >= 0) {
                if(elementString.length > 0) elementString += ',east';
                    else elementString += 'east';
            }
        }
    } else {
        if(elementString.length > 0) elementString += ',east';
            else elementString += 'east';
    }

    if(bottomElement) {
        if(bottomElement.indexOf('north') >= 0) {
            if(elementString.length > 0) elementString += ',south';
                else elementString += 'south';
        }
    } else {
        if(elementString.length > 0) elementString += ',south';
            else elementString += 'south';
    }

    if(element.indexOf('west') === -1 && prevElement) {
        if(prevElement % width !== 0) {
            if(prevElement.indexOf('east') >= 0) {
                if(elementString.length > 0) elementString += ',west';
                    else elementString += 'west';
            }
        }
    }

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
