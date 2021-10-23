import React from "react";
import { Typography, Grid, Button, Container } from "@material-ui/core/";
import useStyles from "../styles/styles";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router";

function AboutPage() {
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => {
    history.push("/user");
  };

  return (
    <div className={classes.mainAboutPage}>
      <Typography className="aboutHeader" style={{fontFamily: 'Luckiest Guy', fontSize: '40px', color: "#216091"}}>About The App</Typography>
      <Typography className={classes.aboutSubHeader}>
        This lovely page is under construction. Here is a cool bean giving a
        speech.
      </Typography>

      <Grid container>
        <Grid item xs={12}>
          <img
            src="./images/bean-podium.png"
            width="220px"
            className={classes.aboutBean}
          />
        </Grid>
        <Grid item item xs={12}>
          <Button
            variant="contained"
            size="medium"
            className={classes.aboutHomeButton}
            onClick={() => goHome()}
          >
            <HomeIcon style={{ fontSize: "35px" }} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutPage;
