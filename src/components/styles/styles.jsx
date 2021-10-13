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
    },

 //-------------imported from spike-------------//

 tableMain: {
  margin: '0',
  padding: '0',
 },

    assetHeader: {
      padding: '30px',
      margin: '20px',
      backgroundColor: 'paper',
  },

  tableRow: {
      cursor: 'pointer',
      paddingTop: '50px',
      textAlign: 'center',
  },

  addButton: {
    textAlign: 'right',
},

//size of icon in main list table
coinIcon: { 
  width: '40px',
},

assetHeader: {
  padding: '30px',
  margin: '20px',
  backgroundColor: 'paper',
},

tableCell: {
  textAlign: 'center',
  padding: '0',
  fontSize: '16px',
},

tableHeader: {
  fontWeight: 'bold',
  fontSize: '20px',
  textAlign: 'center',
  paddingTop: '4px',
  paddingBottom: '4px',
  fontFamily: 'Cabin Condensed', //fix use a new font here
},

tableBody: {
  //fix poking through above head - fix
}


  }))

export default useStyles;
