import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Hamburger from '../Hamburger/Hamburger'; 
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

import useStyles from '../styles/styles.jsx';

import { SwipeableDrawer, IconButton, Container, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';




function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const classes = useStyles();
  const history = useHistory();

  const navToLogin = () => {
    history.push('/login')
  }

  const navToAbout = () => {
    history.push('/about')
  }

  // const navToUserPage = () => {
  //   history.push('/user')
  // } //this didn't quite do what I wanted //deletelater


  return (
    <div className="nav">
      <Link to="/user">
        <h2 className="nav-title"><b>Magic Beans</b><br /><span className="cryptofolio">Cryptofolio</span></h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === undefined && (
          // If there's no user, show login/registration links
          <div>
            <IconButton onClick={() => navToLogin()}>
              <LoginIcon className="navIconL" />
            </IconButton>

            <IconButton onClick={() => navToAbout()}>
              <InfoIcon className="navIconR" />
            </IconButton>
          </div>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <Hamburger />

        )}


      </div>
    </div>
  );
}

export default Nav;
