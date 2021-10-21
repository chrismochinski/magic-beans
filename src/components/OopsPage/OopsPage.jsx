import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import useStyles from "../styles/styles.jsx";

const OopsPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const goHome = () => {
    history.push("/user");
  };

  return (
    <div className="oopsPage">
      <img
        src="/images/magic-beans-logo-404.png"
        style={{ marginTop: "35px", marginBottom: "25px" }}
        width="230px"
      />
      <Typography variant="h2">
        <b>Oops!</b>
      </Typography>
      <Typography variant="h5">That page doesn't exist.</Typography>
      <Button
        onClick={() => goHome()}
        className={classes.loginButton}
        size="large"
        variant="contained"
        name="submit"
      >
        Home
      </Button>
    </div>
  );
};

export default OopsPage;
