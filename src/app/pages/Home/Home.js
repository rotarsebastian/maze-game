import React from 'react';
import classes from './Home.module.css';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    return (
        <React.Fragment>
            <div className={classes.HomeContainer}>
                <div className="Title">
                    Trustpilot Pony Challenge
                </div>

                <h3>Description</h3>
                <p>Pony challenge is a conding challenge in which the attendant has to build a maze game based on the data received from the Trustpilot API. 
                   The maze is built out from a set of data which consist of a matrix. A matrix has a given width and height - given by the user - and it is 
                   created dinamically. After the user sets a pony name and a difficulty level the game begins
                </p>


                <h3>Solution</h3>
                <p>After finding a valid pony name I realised that this challenge implies not only a coding challenge, but also a matter of daily basis situation.
                   I started to like it, I like to call myself a problem solver.<br /><br />
                   After carefully analyzing the data format and the final maze print I have decided
                   that I want to create the maze as an SVG. I choosed SVG because I have built something similar before, but in plain JavaScript. This time I 
                   wanted to use React. Not only because it is one of my favorite frameworks, but also because it is the thing I used the most the latest months 
                   and I want to get better with it.<br /><br />
                   My solution is similar to the legendary Pac-Man excepts that you have full control of your next moves, there is only one monster and you don't 
                   need to eat anything, just to escape. 
                </p>
                <button onClick={() => history.push('/play')} className="PlayButton">Play</button>
            </div>
        </React.Fragment>
    )
}

export default Home;