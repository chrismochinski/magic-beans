import React from "react";
import { Typography, Grid, Button, Container } from "@material-ui/core/";
import useStyles from "../styles/styles";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

function AboutPage() {
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => {
    history.push("/user");
  };

  return (
    <div className={classes.mainAboutPage}>
      <Typography
        className="aboutHeader"
        style={{
          fontFamily: "Luckiest Guy",
          fontSize: "40px",
          color: "#216091",
        }}
      >
        About The App
      </Typography>
      {/* <Typography className={classes.aboutSubHeader}>
        This lovely page is under construction. Here is a cool bean giving a
        speech.
      </Typography> */}

      <Grid container>
        <Grid
          item
          xs={7}
          sm={7}
          md={7}
          lg={7}
          xl={7}
          className={classes.aboutImage}
        >
          <img
            src="./images/bean-podium.png"
            width="60%"
            className={classes.aboutBean}
          />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
          <Typography variant="h6" className={classes.aboutListHeader}>
            Built With:
          </Typography>
          <Typography className={classes.aboutList}>
            🍩 Visual Studio Code
            <br />
            🍩 Pixelmator Pro
            <br />
            🍩 CoinGecko API
            <br />
            🍩 Material UI
            <br />
            🍩 Moment.js
            <br />
            🍩 date-fns
            <br />
            🍩 react-chartjs-2
            <br />
            🍩 GiFox
            <br />
            🍩 Postico
            <br />
            🍩 Love
            <br />
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ textAlign: "center" }}
        >
          <Typography className={classes.thanks}>
            A bajillion thanks to my wonderful little family for being
            wonderful, my instructors at Prime for the endless encouragement, my
            cohort mates for the late night coding parties, Jeff Rutland and
            Tyler Jorenby for the their veteran wisdom, Crypto Jebb and his team
            for the companionship on weekdays between 8:30 and 9:30 AM, the fine
            folks at Coingecko for providing an awesome API, and my absolutely
            perfect fiancée Sharesa (almost) Mochinski for holding down the fort
            and being the most incredible human ever.
          </Typography>
        </Grid>

        <Grid item className={classes.socialRow}>
          <a href="https://www.linkedin.com/in/chrismochinski/" target="_blank">
            <LinkedInIcon className="aboutLink" />
          </a>
          <a href="https://github.com/chrismochinski" target="_blank">
            <GitHubIcon className="aboutLink" />
          </a>
          <a href="https://twitter.com/holymosesmusic" target="_blank">
            <TwitterIcon className="aboutLink" />
          </a>
        </Grid>

        <Grid item item xs={12} sm={12} md={12} lg={12} xl={12}>
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
