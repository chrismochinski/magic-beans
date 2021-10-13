import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import Hamburger from '../Hamburger/Hamburger'; //fix
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

import useStyles from '../styles/styles.jsx';

import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';




function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const classes = useStyles();

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
            <Link className="navIconL" to="/login">
              <LoginIcon />
            </Link>

            <Link className="navIconR" to="/about">
              <InfoIcon />
            </Link>
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
