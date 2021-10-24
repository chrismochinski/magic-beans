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

  // const noThanks = () => {
  //     console.log('User DOES NOT agree with terms. Navigating to seizurebots');
  // }

  return (
    <Container className={classes.disclaimer}>
      <Typography className={classes.disclaimerHeadline} variant="h3">
        Disclaimer:{" "}
      </Typography>
      <Typography className={classes.disclaimerStatements}>
        This application is a convenient place to track real-time
        cryptocurrency market and portfolio data. It is <i>not</i> an exchange.{" "}
        <span style={{ fontSize: "19px" }}>Real money is not spent here.</span>
        <br />
        <br /> The developer of this application is not a financial advisor,
        CPA, accountant, ninja, cowboy or astronaut. <br />
        <br /> Cryptocurrency is a volatile market and should be approached with
        care. Please don't invest money you can't afford to lose.
      </Typography>

      <Button
        onClick={() => goToLogin()}
        className={classes.addPositionButton}
        variant="contained"
        size="medium"
      >
        Agree
      </Button>
    </Container>
  );
};

export default Disclaimer;
