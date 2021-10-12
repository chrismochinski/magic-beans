import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import { Typography, Container, Card, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import useStyles from '../styles/styles.jsx'

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {

  const classes = useStyles();

  const [heading, setHeading] = useState("/images/magic-beans-logo.png"); //logo instead
  const history = useHistory();



  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">

      {/* Changed to logo  */}
      <img className="logo" width="200px" src={heading} />

      <div className="grid">
        
        {/* UPDATED THIS IS THE LOGIN SPACE - MAKE CARD */}
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
            </center>
          </div>
        
      </div>
    </div>
  );
}

export default LandingPage;
