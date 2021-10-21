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
        The developer of this application is not now and will never claim to be
        a professional financial advisor, CPA, accountant, ninja, cowboy or
        astronaut. They are not to be held responsible for any investment
        decisions you choose to make. <br />
        <br /> Cryptocurrency is a volatile market and should be approached with
        care. Don't ever invest money you can't afford to lose.
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
