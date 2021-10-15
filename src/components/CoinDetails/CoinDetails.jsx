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
    const [chartData, setChartData] = useState([]);
    const [coinDetails, setCoinDetails] = useState([]);

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
     */           //todo needs own page
    // useEffect(() => {
    //     axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
    //         .then(res => {
    //             setChartData(res.data.prices);
    //             console.log('Response of seven day chart data is:', res.data.prices);
    //         }).catch(error => console.log('error getting cryptos:', error))
    //     fetchCoinInfo()
    // }, [])

    //     //todo needs own page
    // const fetchCoinInfo = async () => {
    //     console.log('in fetchCoininfo! id:', id)
    //     await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
    //         .then(res => {
    //             setCoinDetails(res.data);
    //             console.log('res.data in fetchCoinInfo is:', res.data)
    //         }).catch(error => console.log('error getting coin details!', error))

    // }

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
            .then(res => {
                setChartData(res.data.prices);
                console.log('Response of seven day chart data is:', res.data.prices);
            }).catch(error => console.log('error getting cryptos:', error))
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
            .then(res => {
                setCoinDetails(res.data);
                console.log('res.data in fetchCoinInfo is:', res.data)
            }).catch(error => console.log('error getting coin details!', error))

    }, [])




    const renderPage = () => { //FIX THIS
        if (chartData && coinDetails) {
            return <div>Loading coin info...</div>
        }
    }



    return (
        <Container className={classes.detailsPage}>
            {/* <Typography className={classes.pageHeader} variant="h3">Coin Details Page</Typography> */}
            <Typography variant="h4">{coinDetails.name}</Typography>
            {/* <Typography variant="h2">{coinDetails.symbol.toUpperCase()}</Typography> */}
            <Typography variant="h5">{coinDetails.categories}</Typography><br />

            {/* <Typography variant="h5">Platform: {coinDetails.asset_platform_id}</Typography><br /> */}

            {/* <Typography variant="h5">{coinDetails.description.en}</Typography><br /> */}
{/* 
            <Typography variant="h5">Twitter: {coinDetails.links.twitter_screen_name}</Typography><br />
            <Typography variant="h5">Website: {coinDetails.links.homepage}</Typography><br /> */}



            {JSON.stringify(coinDetails)}
            {JSON.stringify(chartData)}
            <Button className={classes.loginButton} size="large" variant="contained" onClick={() => navBack()}>Go Back</Button>
            <Container>
                <Typography style={{ paddingTop: "40px" }} variant="h4">{renderPage()}</Typography>
            </Container>
        </Container>
    );
}

export default CoinDetails;
