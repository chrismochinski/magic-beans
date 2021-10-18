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

  //-------------Main userPage-------------//

  pageMainHeader: {
    fontFamily: 'Josefin Sans',
    padding: '10px',
    marginBottom: '`10px',
    fontSize: '36px',
    textAlign: 'center',
  },

  pageHeader: {
    fontFamily: 'Poppins',
    padding: '10px',
    marginBottom: '`10px',
    fontSize: '36px',
    textAlign: 'center',
  },


  //-------------Main userPage TABLE-------------//


  tableTickerCell: {
    textAlign: 'center',
    padding: '0',
    fontSize: '20px',
  },


  tableCell: {
    textAlign: 'center',
    padding: '0',
    fontSize: '20px',
  },

  //-------------imported from spike-------------//


  tableRow: {
    cursor: 'pointer',
    paddingTop: '50px',
    textAlign: 'center',
  },


  //size of icon in main list table
  coinIcon: {
    width: '44px',
  },



  tableHeader: {
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: 0, // table goes beyond edges of phone screen w/o this
    paddingRight: 0, // table goes beyond edges of phone screen w/o this
    fontFamily: 'Cabin Condensed',
  },

  tableBody: {
    //fix poking through above head - fix
  },

  //-------------SearchPage > CoinSearchPage-------------//


  mainSearchPage: {
    padding: '20px',
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '200px',
    margin: 'auto',
  },

  floatLeft: {
    width: '100%',
    margin: 'auto',
  },

  floatRight: {
    width: '100%',
    margin: 'auto',
  },


  searchButton: {
    marginTop: '20px',
    marginRight: '5px',
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bolder',
    backgroundColor: '#5C9827',
    color: 'white',

  },

  goHomeButton: { 
    marginTop: '20px',
    padding: '10px',
    fontSize: '20px',
    marginLeft: '5px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#9333F0',
  },

  detailToSearchButton: {
   marginTop: '20px',
    padding: '10px',
    fontSize: '20px',
    marginRight: '5px',
    fontWeight: 'bold',
    backgroundColor: '#9333F0',
    color: 'white',
  },


  cardMedia: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0',

  },

  fieldAndButton: {
    align: 'left',
  },

  //-------------confirm modal-------------//




  dialogueLogo: {
    width: '150px',
    justify: 'center',
    margin: 'auto',
    paddingTop: '23px'
  },



  //-------------used everywhere-------------//

  backButton: {
    color: 'white',
    backgroundColor: '#9333F0',
    fontSize: '20px',
    marginTop: '20px',
    padding: '10px',
  },

  homeButton: {
    color: 'white',
    backgroundColor: '#216091',
    fontSize: '20px',
    marginTop: '20px',
    padding: '10px',
  },

  textField: {
    fontSize: 50,
  },

  //-------------user holdings list-------------//

  assetHeadline: {
    fontFamily: 'Poppins',
    fontSize: '40px',

  },

  holdingsDeleteButton: {

  },

  holdingsModifyButton: {

  },

  //-------------user holdings TABLE-------------//

  tableMain: {
    width: '100%',

  },

  userTableHeaderCell: {
    fontFamily: 'Cabin Condensed',
    textAlign: 'center',
    fontSize: '18px',
    padding: 0,
    margin: 0,
  },

  //====user holding table BODY CELL====//  

  holdingSymbol: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 0,
    margin: 0,

  },

  holdingAmount: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontSize: '17px',
    fontWeight: 'bold',
    padding: 0,
    margin: 0,


  },

  holdingVal: {
    fontFamily: 'Poppins',

    textAlign: 'center',
    fontSize: '17px',
    fontWeight: 'bold',
    padding: 0,
    margin: 0,


  },

  //delete button
  holdingDelete: {
    padding: 0,
    textAlign: 'right',
  },

  //put button
  holdingModify: {
    padding: 0,
    textAlign: 'left',

  },

  assetHeader: {

    marginBottom: '18px',
    backgroundImage: `url(${'./images/mb-logo-opaque.png'})`,
    backgroundSize: '98%',
    backgroundPosition: 'center',
  },

  addPositionButton: {
    margin: '20px',
    fontSize: '25px',
    fontWeight: 'bolder',
    backgroundColor: '#5C9827',
    color: 'white',
  },

  addIcon: {
    transform: 'scale(2.5)',
  },

}))

export default useStyles;
