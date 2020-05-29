import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/pony-logo.svg';

const Header = () => {

    return (
        <React.Fragment>
            <div className={classes.HeaderContainer}>

                <div className={classes.NavbarLeft}>
                    <NavLink exact to="/" activeClassName={classes.active}>
                        <img className={classes.Logo} src={Logo} alt="logo" />
                    </NavLink>
                </div>
                
                <div className={classes.NavbarRight}>
                    <NavLink exact to="/" activeClassName={classes.active}>
                        <span className={classes.Button}>Home</span> 
                    </NavLink>

                    <NavLink to="/play" activeClassName={classes.active}>
                        <span className={classes.Button}>Play</span> 
                    </NavLink>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Header;