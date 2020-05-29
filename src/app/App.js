import React from 'react';
import classes from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Play from './pages/Play/Play';
import Header from './components/Header/Header';
import Game from './components/Game/Game';

const App = () => {

  return (
    <div>
      <Router> 
        <Header />
        <div className={classes.Root}>
          <Switch>
            <Route exact path='/' component={props => <Home { ...props } />} />
            <Route exact path='/play' component={props => <Play { ...props } />} />
            <Route exact path='/play/:mazeId' component={({ match }) => <Game id={match.params.mazeId} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
