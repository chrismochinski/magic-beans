import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Grid, TextField, GridItem } from '@material-ui/core';
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

    //set state of search / chart info results
    const [chartData, setChartData] = useState([]);

    //setting up loading dialogue
    const [isLoading, setIsLoading] = useState(false); //initial value false on page loading

    //setting state of coin info EG: description, symbol, links
    const [coinInfo, setCoinInfo] = useState([]); //all info for coin
    const [coinName, setCoinName] = useState('');
    const [coinSymbol, setCoinSymbol] = useState('');
    const [coinTwitter, setCoinTwitter] = useState('');
    const [coinTwitterLink, setCoinTwitterLink] = useState('');
    const [coinWebsite, setCoinWebsite] = useState('');
    const [coinForum, setCoinForum] = useState('');
    const [coinDescription, setCoinDescription] = useState('');

    //setting state of coin PRICE information (all numbers)
    const [coinPrice, setCoinPrice] = useState();
    const [coinMarketCap, setCoinMarketCap] = useState();
    const [coinVolume, setCoinVolume] = useState();
    const [coinPriceChange, setCoinPriceChange] = useState();
    const [coinLastUpdated, setCoinLastUpdated] = useState('');

    const [coinAmount, setCoinAmount] = useState();



    const navBack = () => {
        history.push('/search')
    }

           //todo needs own page = chartPage
    useEffect(() => {
        setIsLoading(true) //IMPORTANT BEGIN LOADING

        dispatch({type: 'FETCH_COIN_LIST' })
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
            .then(res => {
                setChartData(res.data.prices);
                console.log('Response of seven day chart data is:', res.data.prices);
            }).catch(error => console.log('error getting cryptos:', error))
        fetchCoinInfo()
    }, [])

    //todo needs own page = infoPage
    const fetchCoinInfo = async () => { //important updates coin INFO such as description
        await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`)
            .then(res => {
                setCoinInfo(res.data);
                console.log('res.data in fetchCoinInfo is:', res.data)
                setCoinName(res.data.name)
                setCoinSymbol(res.data.symbol.toUpperCase())
                setCoinTwitter(res.data.links.twitter_screen_name)
                setCoinWebsite(res.data.links.homepage)
                setCoinForum(res.data.links.official_forum_url)
                setCoinDescription(res.data.description.en)
            }).catch(error => console.log('error getting coin details!', error));
        fetchCoinPriceInfo();
    };

    //todo MAYBE own page??????
    const fetchCoinPriceInfo = async () => { //important updates all coin PRICE-related info such as MC
        await axios.get(`    https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true
        `)
            .then(res => {
                setCoinInfo(res.data);
                console.log('res.data in fetchCoinPRICEinfo', res.data)
                setCoinPrice(res.data.usd)
                setCoinMarketCap(res.data.usd_market_cap)
                setCoinVolume(res.data.usd_24h_vol)
                setCoinPriceChange(res.data.usd_24h_change)
                setCoinLastUpdated(res.data.last_updated_at)
                setIsLoading(false); //IMPORTANT END LOADING
            }).catch(error => console.log('error getting coin details!', error));
    };


    const renderPage = () => { //FIX Shows a loading dialogue if loading (CHANGE TO A COOL ANIMATION)
        if (isLoading) {
            return <div>Loading coin info...</div>
        }
    }

    const handleAddCoins = () => { //updated POST ROUTE
        console.log(`user added ${coinAmount} of ${coinName} which is ID of ${id} at price of ${coinPrice}`)
        console.log('coin price is:', coinPrice)
        dispatch({ type: 'SEND_COIN_ADDITION' }); //fix unmute this!


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

            {/* {JSON.stringify(coinInfo)}  //deletelater json stringify of all details */}
            {/* {JSON.stringify(chartData)}  // deletelater json stringify of chart data */}
            <Grid container justifyContent="center" >


                <Container maxWidth="sm">
                    <form onSubmit={handleAddCoins} style={{ textAlign: 'center' }}>
                        <TextField style={{marginRight: '5px'}} 
                            id="standard-basic"
                            variant="standard"
                            type="number"
                            required
                            value={coinAmount}
                            className="coinInput"
                            label="Amount To Add"
                            onChange={(event) => setCoinAmount(event.target.value)} //important setting amount user is adding
                        />
                        
                            <Button style={{marginLeft: '5px'}} variant="contained" size="medium" type="submit" className={classes.searchButton}>Add</Button>
                       
                    </form>
                </Container>


            </Grid>
            <div style={{ textAlign: 'center' }}>
                <Button className={classes.backButton} size="large" variant="contained" onClick={() => navBack()}>Back</Button>
            </div>

            <Container>
                <Typography style={{ paddingTop: "40px" }} variant="h4">{renderPage()}</Typography>
            </Container>
        </Container>
    );
}

export default CoinDetails;
