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
        width: '70%',
        marginBottom: '0',
    },
    loginForm: {
      textAlign: 'center', 
    },
    loginButton: {
      marginTop: '15px',
      fontSize: '20px',
      fontWeight: 'bolder',
      backgroundColor: '#5C9827',
      color: 'white',
      
    },
    loginTextField: {
      width: '25ch', 
      marginBottom: '5px'
    }
  }))

export default useStyles;
