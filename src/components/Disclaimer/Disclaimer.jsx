import React from 'react'
import { useHistory } from 'react-router-dom';

import { Typography, Container, Card, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import useStyles from '../styles/styles.jsx'

const Disclaimer = () => {

    const classes = useStyles(); //importing master class/style doc
    const history = useHistory();

    const goToLogin = () => {
        console.log('User agrees to terms');
        history.push('/login');
    }

    // const noThanks = () => {
    //     console.log('User DOES NOT agree with terms. Navigating to seizurebots');
    // }

    return (
            <Container className={classes.disclaimer}>

                <Typography className={classes.disclaimerStatements} variant="h4">Disclaimer: </Typography>
                <Typography >The creators of this page are not financial advisors
                    and are not to be held responsible for any investment decisions you choose to make. <br /><br /> Cryptocurrency is
                    a volatile market and should be approached with extreme care. Don't ever invest money you
                    can't afford to lose.</Typography>

                <Button onClick={() => goToLogin()} style={{ backgroundColor: "#2EA4DB", margin: '20px' }} variant="contained" size="medium">Agree</Button>
                {/* <Button onClick={() => noThanks()} style={{backgroundColor: "#F54561", margin: '5px'}} variant="contained" size="medium">No Thanks</Button> */}
            </Container>
    )
}

export default Disclaimer;
