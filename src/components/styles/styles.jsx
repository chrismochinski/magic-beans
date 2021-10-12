import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({

//-------------Disclaimer.jsx-------------//

    disclaimer: {
      textAlign: 'center',
      padding: '40px',
    },
    Button: {
        marginTop: '40px',
        paddingTop: '40px'
    },

 //-------------Login / Register-------------//

    logo: {
        width: '200px',
        marginBottom: '0',
    },
    loginForm: {
      textAlign: 'center', 
    },
    loginButton: {
      marginTop: '15px',
    },
    loginTextField: {
      width: '25ch', 
      marginBottom: '5px'
    }
  }))

export default useStyles;
