import React from "react";
import { Typography, Grid, Button } from "@material-ui/core/";
import useStyles from "../styles/styles";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router";

function AboutPage() {
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => {
    history.push('/user');
  }

  return (
    <div className="container">

    <Typography className={classes.aboutHeader}>About The App</Typography>


      <Button
        variant="contained"
        size="medium"
        className={classes.goHomeButton}
        onClick={() => goHome()}
      >
        <HomeIcon style={{ fontSize: "35px" }} />
      </Button>
    </div>
  );
}

export default AboutPage;
