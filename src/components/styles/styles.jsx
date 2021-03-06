import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  //-------------Disclaimer.jsx-------------//

  disclaimer: {
    textAlign: "center",
    paddingTop: "20px",
    backgroundSize: "70",
    backgroundPosition: "30% 40%",
    backgroundRepeat: "no-repeat",
  },
  Button: {
    marginTop: "40px",
    paddingTop: "40px",
  },

  disclaimerHeadline: {
    fontFamily: "Luckiest Guy",
    fontSize: "38px",
  },

  disclaimerStatements: {
    margin: "12px",
    fontFamily: "Poppins",
    fontSize: "15px",
  },

  //-------------Login / Register-------------//

  logo: {
    width: "65%",
    marginBottom: "0",
  },

  loginForm: {
    textAlign: "center",
  },

  loginButton: {
    marginTop: "15px",
    fontSize: "20px",
    fontWeight: "bolder",
    backgroundColor: "#5C9827",
    color: "white",
  },
  loginTextField: {
    width: "25ch",
    marginBottom: "5px",
  },

  //-------------Main userPage-------------//

  pageMainHeader: {
    fontFamily: "Poppins",
    padding: "1px",
    marginBottom: "12px",
    fontSize: "28px",
    textAlign: "center",
  },

  pageHeader: {
    fontFamily: "Poppins",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "36px",
    textAlign: "center",
  },

  //-------------Main userPage TABLE-------------//

  tableTickerCell: {
    textAlign: "center",
    padding: "0",
    fontSize: "21px",
    fontFamily: 'Poppins',
  },

  tableCell: {
    textAlign: "center",
    padding: "0",
    fontSize: "20px",
  },

  tablePriceCell: {
    textAlign: "center",
    padding: "0",
    fontSize: "20px",
    fontFamily: "Poppins",
  },

  table24Cell: {
    textAlign: "center",
    padding: "0",
    fontSize: "18px",
    fontFamily: "Poppins",

  },

  //-------------imported from spike-------------//

  tableRow: {
    cursor: "pointer",
    textAlign: "center",
  },

  //size of icon in main list table
  coinIcon: {
    width: "43px",
  },

  tableHeader: {
    fontWeight: "bold",
    fontSize: "22px",
    textAlign: "center",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: 0, // table goes beyond edges of phone screen w/o this
    paddingRight: 0, // table goes beyond edges of phone screen w/o this
    fontFamily: "Cabin Condensed",
  },

  //-------SearchPage > CoinSearchPage-------//

  mainSearchPage: {
    padding: "20px",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "100px",
    margin: "auto",
  },

  //-------SearchPage > CARD contents-------//

  arrowPercent: {
    verticalAlign: "-15%",
    fontSize: "130%",
  },

  pipe: {
    fontSize: "160%",
    color: "#1976D245",
    padding: "2px",
    verticalAlign: "-12%",
  },

  question: {
    fontSize: "130%",
    color: "#1976D250",
    verticalAlign: "-11%",
  },

  floatCenter: {
    width: "100%",
    margin: "auto",
  },

  cardText: {
    fontSize: "1.5em",
    color: "#00000085",
  },

  cardNameText: {
    fontFamily: "Poppins",
  },

  cardTickerText: {
    fontFamily: "Poppins",
    fontWeight: "bolder",
  },

  searchButton: {
    marginTop: "20px",
    marginRight: "5px",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "bolder",
    backgroundColor: "#5C9827",
    color: "white",
  },

  goHomeButton: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "20px",
    marginLeft: "5px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#9333F0",
  },

  detailsButton: {
    marginTop: "5px",
    padding: "7px",
    fontSize: "1.3em",
    fontWeight: "bold",
    backgroundColor: "#5C9827",
    color: "white",
  },

  clearSearchButton: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "20px",
    marginLeft: "10px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#D54D00",
  },

  detailToSearchButton: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "20px",
    marginRight: "5px",
    fontWeight: "bold",
    backgroundColor: "#9333F0",
    color: "white",
  },

  cardMedia: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0",
  },

  fieldAndButton: {
    align: "left",
  },

  //-------------confirm modal-------------//

  dialogueLogo: {
    width: "150px",
    justify: "center",
    margin: "auto",
    paddingTop: "23px",
  },

  //-------------used everywhere-------------//

  backButton: {
    color: "white",
    backgroundColor: "#9333F0",
    fontSize: "20px",
    marginTop: "20px",
    padding: "10px",
  },

  homeButton: {
    color: "white",
    backgroundColor: "#216091",
    fontSize: "20px",
    marginTop: "20px",
    padding: "10px",
  },

  textField: {
    fontSize: 50,
  },

  //-------------user holdings list-------------//

  assetHeadline: {
    fontFamily: "Poppins",
    fontSize: "40px",
  },

  holdingsDeleteButton: {},

  holdingsModifyButton: {},

  //-------------user holdings TABLE-------------//

  tableMain: {
    width: "100%",
  },

  userTableHeaderCell: {
    fontFamily: "Cabin Condensed",
    textAlign: "center",
    fontSize: "19px",
    padding: 0,
    margin: 0,
  },

  //-------------DETAILS page-------------//


  //-------------user holding table BODY CELL-------------//

  holdingSymbol: {
    fontFamily: "Poppins",
    fontSize: "17px",
    textAlign: "center",
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },

  holdingAmount: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },

  holdingVal: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },

  //delete button
  holdingDelete: {
    padding: 0,
    textAlign: "right",
  },

  //put button
  holdingModify: {
    padding: 0,
    textAlign: "left",
  },

  assetHeader: {
    marginBottom: "18px",
    backgroundImage: `url(${"./images/accountant-bean.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "98%",
    backgroundPosition: "top",
  },

  

  pieButton: {
    marginBottom: "25px",
    fontSize: "25px",
    backgroundColor: "#9333F0",
    color: "white",
  },

  addIcon: {
    transform: "scale(2.5)",
  },

  //-------------Modify Page-------------//

  modHeader: {
    fontFamily: "Comfortaa",
    padding: "10px",
    marginBottom: "10px",
    marginLeft: "20px",
    marginRight: "20px",
    fontSize: "18px",
    textAlign: "center",
  },

  modPreInput: {
    fontFamily: "Comfortaa",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "28px",
    textAlign: "center",
  },

  modifyButton: {
    margin: "15px",
    fontSize: "26px",
    fontWeight: "bolder",
    backgroundColor: "#5C9827",
    color: "white",
  },

  cancelButton: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#9333F0",
  },

  //-------------About Page-------------//

  mainAboutPage: {
    padding: "8px",
    textAlign: "center",
    paddingTop: "10px",
    margin: "auto",
  },

  aboutSubHeader: {
    fontFamily: "Poppins",
    fontSize: "16px",
    marginBottom: "10px",
  },

  aboutBean: {
    alignSelf: "center",
    marginTop: "16px",
    marginBottom: "10px",
  },

  aboutListHeader: {
    textAlign: "left",
    fontSize: "4vw",
    marginTop: "14px",
    marginBottom: "9px",
    fontFamily: "Poppins",
    lineHeight: 1,
  },

  aboutList: {
    textAlign: "left",
    fontSize: "3.1vw", 
    fontFamily: "Poppins",
  },

  thanks: {
    marginTop: "2vh",
 
    marginInline: "7vw",
    textAlign: "center",
    fontSize: "1.25vw",
    fontFamily: "Poppins",
  },

  a: {
    textDecorationLine: "none",
    color: "black",
  },

  socialRow: {
    margin: "auto",
    paddingTop: "18px",
    transform: "scale(1.3)",
    color: "black",
    marginBottom: "10px",
  },

  aboutHomeButton: {
    marginTop: "24px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#9333F0",
  },

  //-------------Info dialogues-------------//
}, {index: 1});

export default useStyles;
