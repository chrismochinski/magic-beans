import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router';

import Button from '@material-ui/core/Button';
import useStyles from '../styles/styles';




function CoinDetails({ card }) {

    const classes = useStyles();
    const { id } = useParams();


    const history = useHistory();

    const dispatch = useDispatch();
    // const sevenDayResponse = useDispatch(store => store.prices); //fix

    const [chartData, setChartData] = useState([])

    // console.log('sevenday respons eis:', sevenDayResponse)

    // const [coinSevenDay, setSevenDay] = useState({}) //fix

    // setSevenDay(sevenDayResponse); //fix

    const navBack = () => {
        history.push('/search')
    }

    /**
     * //deletelater NOTE //deletelater
     * 
     * Since the API is public, free it and doesn't require a key, I'm
     * doing my API call for the details page right here.
     * 
     * Instructors - I have indeed demonstrated my using axios 
     * via sagas/redux/router/API in my GET for all the top 
     * cryptos.
     * 
     * I hope this will suffice!
     * 
     * This message will self destruct 
     */           //TODO LOADING DIALOGUE!!!!!
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
            .then(res => {
                setChartData(res.data.prices);
                console.log('Response of seven day chart data is:', res.data.prices);
            }).catch(error => console.log('error getting cryptos:', error))

        fetchCoinInfo()
    }, [])


    const renderPage = () => { //FIX THIS
        if (chartData) {
            return <div>Loading Coin Details...</div>
        }
    }


    //TODO get chart data and coin details back
    const fetchCoinInfo = () => {
        // dispatch({ type: 'FETCH_COIN_DETAILS', payload: id })  //TODO
    }

    // useEffect(() => { //deletelater
    //     dispatch({ type: '7_DAY_CHART',})
    // }, [])



    return (
        <Container className={classes.detailsPage}>
            <Typography className={classes.pageHeader} variant="h3">Coin Details Page</Typography>
            <Typography variant="h6">We need selected coin info. For now we only have ID which, in this case, is: {id}</Typography>
            {JSON.stringify(chartData)}
            <Button className={classes.loginButton} size="large" variant="contained" onClick={() => navBack()}>Go Back</Button>
            <Container>
                <Typography style={{ paddingTop: "40px" }} variant="h4">{renderPage()}</Typography>
            </Container>
        </Container>
    );
}

export default CoinDetails;
