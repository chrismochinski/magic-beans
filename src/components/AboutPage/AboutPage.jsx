import React from "react";
import { Typography, Grid } from "@material-ui/core/";
import useStyles from "../styles/styles";
import { useHistory } from "react-router";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import "./AboutPage.css";

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
          fontSize: "8vw",
          color: "#216091",
        }}
      >
        About The App
      </Typography>

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
            width="55%"
            className={classes.aboutBean}
          />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
          <Typography variant="h6" className={classes.aboutListHeader}>
            Built With:
          </Typography>
          <Typography className={classes.aboutList}>
            🍩 React
            <br />
            🍩 Redux-Saga
            <br />
            🍩 Node
            <br />
            🍩 Express
            <br />
            🍩 Postgres
            <br />
            🍩 react-chartjs-2
            <br />
            🍩 Material UI
            <br />
            🍩 Coingecko API
            <br />
            🍩 date-fns
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
            cohort mates for the late night coding parties, the fine folks at{" "}
            <a href="https://www.coingecko.com/" target="_blank">
              Coingecko
            </a>{" "}
            for providing an awesome API, my fiancée{" "}
            <a href="https://www.instagram.com/sharesadoeshair" target="_blank">
              Sharesa [almost] Mochinski
            </a>
            for holding down the fort and being the most incredible human ever,
            and{" "}
            <a href="https://www.youtube.com/channel/UC0YkTHGHUNvr2iJ7zpjZelA" target="_blank">
              Cooper
            </a>
            ...for naming this app.
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
          {/* <Button
            variant="contained"
            size="small"
            className={classes.aboutHomeButton}
            onClick={() => goHome()}
          >
            <HomeIcon style={{ fontSize: "35px" }} />
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutPage;
