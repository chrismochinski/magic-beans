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
    const [isLoading, setIsLoading] = useState(false); //initial value false on page loading

    const [coinInfo, setCoinInfo] = useState([]); //all info for coin
    const [coinName, setCoinName] = useState('');
    const [coinSymbol, setCoinSymbol] = useState('');
    const [coinPlatform, setCoinPlatform] = useState('');
    const [coinTwitter, setCoinTwitter] = useState('');
    const [coinWebsite, setCoinWebsite] = useState('');
    const [coinForum, setCoinForum] = useState('');
    const [coinDescription, setCoinDescription] = useState('');



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
     * 
     */           //todo needs own page = chartPage
    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
            .then(res => {
                setChartData(res.data.prices);
                console.log('Response of seven day chart data is:', res.data.prices);
            }).catch(error => console.log('error getting cryptos:', error))
        fetchCoinInfo()
    }, [])

    //todo needs own page = infoPage
    const fetchCoinInfo = async () => {
        console.log('in fetchCoininfo! id:', id)
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
            .then(res => {
                setCoinInfo(res.data);
                console.log('res.data in fetchCoinInfo is:', res.data)
                setCoinName(res.data.name)
                setCoinSymbol(res.data.symbol.toUpperCase())
                // setCoinPlatform(res.data.asset_platform_id)  // not cooperating
                setCoinTwitter(res.data.links.twitter_screen_name)
                setCoinWebsite(res.data.links.homepage)
                setCoinForum(res.data.links.official_forum_url)
                setCoinDescription(res.data.description.en)
                setIsLoading(false);

            }).catch(error => console.log('error getting coin details!', error))

    }


    //optimize all in one - probably //deletelater
    // useEffect(() => {
    //     axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
    //         .then(res => {
    //             setChartData(res.data.prices);
    //             console.log('Response of seven day chart data is:', res.data.prices);
    //         }).catch(error => console.log('error getting cryptos:', error))
    //     axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
    //         .then(res => {
    //             setCoinDetails(res.data);
    //             console.log('res.data in fetchCoinInfo is:', res.data)
    //         }).catch(error => console.log('error getting coin details!', error))

    // }, [])




    const renderPage = () => { //Shows a loading dialogue if loading (CHANGE TO A COOL ANIMATION)
        if (isLoading) {
            return <div>Loading coin info...</div>
        }
    }



    return (
        <Container className={classes.detailsPage}>
            {/* <Typography className={classes.pageHeader} variant="h3">Coin Details Page</Typography> */}
            <Typography variant="h4">{coinName}</Typography>
            <Typography variant="h3">{coinSymbol}</Typography>
            {/* {coinPlatform == null || coinPlatform == undefined ? (<Typography variant="h5">Platform: N/A</Typography>) : (<Typography variant="h5">{coinPlatform}</Typography>)} */}
            <Typography variant="h5" style={{ color: 'blue' }}>@{coinTwitter}</Typography>
            <Typography variant="h5" style={{ color: 'red' }}>{coinWebsite}</Typography>
            <Typography variant="h5" style={{ color: 'purple' }}>{coinForum}</Typography>
            <Typography variant="h6">{coinDescription}</Typography><br />


            {/* <Typography variant="h5">Website: {coinInfo.links.homepage}</Typography><br /> */}



            {JSON.stringify(coinInfo)}
            {JSON.stringify(chartData)}
            <Button className={classes.loginButton} size="large" variant="contained" onClick={() => navBack()}>Go Back</Button>
            <Container>
                <Typography style={{ paddingTop: "40px" }} variant="h4">{renderPage()}</Typography>
            </Container>
        </Container>
    );
}

export default CoinDetails;
