const endpoint = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

// ====================== CREATE NEW MAZE ======================
export const createMaze = async(mazeData) => {
    try {
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mazeData)
        };
        const response = await fetch(endpoint, options);
        const data = await response.json();

        return { status: 1, data };
    }
    catch(err) {
      return { status: 0, message: 'Can not connect to the API' };
    }
};

// ====================== GET MAZE BY ID ======================
export const getMaze = async(id) => {
    try {
        const options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(endpoint + `/${id}`, options);
        const mazeData = await response.json();

        return { status: 1, mazeData };
    }
    catch(err) {
      return { status: 0, message: 'Can not connect to the API' };
    }
};

// ====================== REQUEST PONY NEW POSITION ======================
export const movePony = async(id, direction) => {
  try {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(direction)
      };
      const response = await fetch(endpoint + `/${id}`, options);
      const newGameStatus = await response.json();

      return { status: 1, newGameStatus };
  }
  catch(err) {
    return { status: 0, message: 'Can not connect to the API' };
  }
};
