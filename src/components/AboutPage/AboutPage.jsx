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
    <div className={classes.aboutContainer} >
      <Container>
        <Typography className={classes.aboutHeader}>About The App</Typography>
        <Typography className={classes.aboutSubHeader}>
          This lovely page is under construction. Here is a cool bean giving a speech.
        </Typography>
      </Container>
      <Container className={classes.aboutContainer} style={{textAlign: 'center'}}>
        <img src="./images/bean-podium.png" width="220px" />
        <Button 
          variant="contained"
          size="medium"
          className={classes.aboutHomeButton}
          onClick={() => goHome()}
        >
          <HomeIcon style={{ fontSize: "35px" }} />
        </Button>
      </Container>
    </div>
  );
}

export default AboutPage;
