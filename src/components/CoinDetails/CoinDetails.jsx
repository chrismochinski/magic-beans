import React, { useEffect } from 'react';
import { Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router';

import Button from '@material-ui/core/Button';
import useStyles from '../styles/styles';




function CoinDetails({card}) {

    const classes = useStyles();
    const coinInfo = useSelector(store => store.cryptoListReducer)

    const { id } = useParams() //important REDUX STORE!

    const navBack = () => {
        history.push('/')
    }

    const history = useHistory();
    // const classes = useStyles();

    useEffect(() => {
       console.log('id of coin:', card)
       console.log('...and from the reducer:', coinInfo)
    }, []);


    return (
        <Container className={classes.detailsPage}>
            <Typography className={classes.pageHeader} variant="h3">Coin Details Page</Typography>
            <Typography variant="h6">{JSON.stringify(coinInfo)}}</Typography>
            <Button className={classes.loginButton} size="large" variant="contained" onClick={() => navBack()}>Go Back</Button>

        </Container>
    );
}

export default CoinDetails;
