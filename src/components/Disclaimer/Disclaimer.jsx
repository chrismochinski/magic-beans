import React from "react";
import { useHistory } from "react-router-dom";

import { Typography, Container, Card, Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import useStyles from "../styles/styles.jsx";

const Disclaimer = () => {
  const classes = useStyles(); //importing master class/style doc
  const history = useHistory();

  const goToLogin = () => {
    console.log("User agrees to terms");
    history.push("/login");
  };

  return (
    <Container className={classes.disclaimer}>
      <Typography className={classes.disclaimerHeadline} variant="h3">
        Disclaimer:{" "}
      </Typography>
      <Typography className={classes.disclaimerStatements}>
        This <u>styled-for-mobile</u> application is a convenient place to track real-time cryptocurrency
        market and portfolio data. It is <i>not</i> an exchange. Real money is
        not spent here.
        <br />
        <br /> The developer of this application is not a financial advisor,
        CPA, accountant, ninja, cowboy or astronaut. <br />
        <br /> Cryptocurrency is a volatile market and should be approached with
        care. Please don't invest money you can't afford to lose.
      </Typography>

      <Button
        onClick={() => goToLogin()}
        style={{
          margin: "15px",
          fontSize: "25px",
          fontWeight: "bolder",
          backgroundColor: "#5C9827",
          color: "white",
        }}
        variant="contained"
        size="medium"
      >
        Agree
      </Button>
    </Container>
  );
};

export default Disclaimer;
