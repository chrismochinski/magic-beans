import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import ConfirmDialogue from '../ConfirmDialogue/ConfirmDialogue';

import { Typography, Container, Grid, TextField, Button } from '@material-ui/core';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TwitterIcon from '@mui/icons-material/Twitter';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';


import useStyles from '../styles/styles';
import swal from 'sweetalert';

function CoinDetails({ card }) {

    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user)

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
    const [coinImage, setCoinImage] = useState('');

    //setting state of coin PRICE information (all numbers)
    const [coinPrice, setCoinPrice] = useState();
    const [coinPriceToDisplay, setCoinPriceToDisplay] = useState();
    const [totalCost, setTotalCost] = useState();
    const [coinMarketCap, setCoinMarketCap] = useState();
    const [coinVolume, setCoinVolume] = useState();
    const [coinPriceChange, setCoinPriceChange] = useState();
    const [coinLastUpdated, setCoinLastUpdated] = useState('');

    //STUFF TO SEND!
    const [coinAmount, setCoinAmount] = useState();
    const [testObject, setTestObject] = useState({});

    const navSearch = () => {
        history.push('/search')
    }

    /*GET*/
    //API
    //todo needs own page = chartPage
    useEffect(() => {
        // window.scrollTo(0,0) //FIX SCROLL TO 0 - PUT BACK AFTER TESTING
        setIsLoading(true) // begin loading
        console.log('user ID is:', user)
        dispatch({ type: 'FETCH_COIN_LIST' })
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
            .then(res => {
                setChartData(res.data.prices);
                console.log('Response of seven day chart data is:', res.data.prices);
            }).catch(error => console.log('error getting cryptos:', error))
        fetchCoinInfo()
    }, [])

    /*GET*/
    //API
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

    /*GET*/
    //API
    //todo MAYBE own page??????
    const fetchCoinPriceInfo = async () => { //important updates all coin PRICE-related info such as MC
        await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
            .then(res => {
                setCoinPrice(res.data[id].usd.toFixed(2));
                setCoinPriceToDisplay(res.data[id].usd.toLocaleString(undefined,
                    { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 }))
                setCoinMarketCap(res.data[id].usd_market_cap.toFixed(2));
                setCoinVolume(res.data[id].usd_24h_vol.toFixed(2));
                setCoinPriceChange(res.data[id].usd_24h_change.toFixed(2));
                setCoinLastUpdated(res.data[id].last_updated_at);
                setIsLoading(false); // end loading
            }).catch(error => console.log('error getting coin details!', error));
    };

    const handleAddCoins = () => { //todo POST ROUTE
        setTestObject(coinAmount)
        console.log('TEST OBJECT IS:', testObject);
        setTotalCost(coinAmount * coinPrice);
        console.log(`
        User wants to add ${coinAmount} 
        of ${coinName} 
        which is a total user cost of $${(coinAmount * coinPrice).toLocaleString()}
        at $${coinPrice} per coin.
        Current MC of $${(coinMarketCap * 1).toLocaleString()}. 
        ${coinName}'s volume is ${(coinVolume * 1).toLocaleString()} 
        and, in the last 24 hours, 
        its price has changed by ${coinPriceChange}%.`) //fix

        let objectToSend = ({
            user_id: user.id,
            coin_id: id,
            symbol: coinSymbol,
            name: coinName,
            coins_held: parseFloat(coinAmount),
            total_cost: coinAmount * coinPrice,
            per_coin_val: parseFloat(coinPrice)
        })
        readyToDispatch(objectToSend);
        console.log('testing object to send:', objectToSend)
    }

    //POST
    const readyToDispatch = (newPosition) => {
        console.log('SENDING TO DB:', newPosition)
        swal({
            title: "Nice!",
            text: `You added ${newPosition.coins_held} ${newPosition.name}. That's a total value of $${newPosition.total_cost.toLocaleString(undefined,
                { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })}!`,
            icon: "success",
        });
        dispatch({ type: 'ADD_POSITION_TO_DB', payload: newPosition });
        returnHome(); //send to function that history.pushes you home
    }

    //send home
    const returnHome = () => {
        history.push('/user');
    }

    const renderPage = () => { //FIX Shows a loading dialogue if loading (CHANGE TO A COOL ANIMATION)
        if (isLoading) {
            return <div ><img className='coinDetailLoading' width='100px' src='./images/bitcoinLogoSpinning.gif' /></div>
        }
    }


    return (

        <Container className={classes.detailsPage} >
            <Typography variant="h4">{coinName}</Typography>
            <Typography variant="h3"><b>{coinSymbol}</b></Typography>
            <Typography variant="h3">${coinPriceToDisplay}</Typography>
            <Typography variant="h5"> {coinPriceChange < 0 ? (<p className="downRed"><KeyboardArrowDownIcon />{coinPriceChange}% today</p>) : (<p className="upGreen"><KeyboardArrowUpIcon />{coinPriceChange}% today</p>)}</Typography>

            <Typography variant="h6"><b>Market Cap:</b> ${(coinMarketCap * 1).toLocaleString()}</Typography>
            <Typography variant="h6"><b>Vol:</b> {(coinVolume * 1).toLocaleString()}</Typography>
            <Typography style={{ color: 'red' }}>{coinWebsite}</Typography>
            <Typography><TwitterIcon style={{ color: '#00ACEE' }} />@{coinTwitter}</Typography>
            {coinForum[0] === '' ? <Typography></Typography> : <Typography style={{ color: 'purple' }}><ForumIcon style={{ color: '#006400' }} /> {coinForum}</Typography>}
          
            <br />
            <Typography style={{ overflowWrap: 'anywhere' }}>{coinDescription}</Typography>

            <Container>
                <Typography style={{ paddingTop: "40px" }} variant="h4">{renderPage()}</Typography>
            </Container>

            <Grid container justifyContent="center" >
                <Container>
                    <form onSubmit={handleAddCoins}>
                        <Grid container style={{ justifyContent: 'center' }}>
                            <Grid item>
                                <TextField spacing={0}
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 22 } }}
                                    style={{ width: '90%' }}
                                    id="standard-basic"
                                    variant="standard"
                                    type="number"
                                    required
                                    value={coinAmount}
                                    className="coinInput"
                                    label="Amount To Add"
                                    onChange={(event) => setCoinAmount(event.target.value)} //important setting amount user is adding
                                />
                            </Grid>
                            <Grid item>
                                <ConfirmDialogue
                                    handleAddCoins={handleAddCoins}
                                    coinAmount={coinAmount}
                                    coinName={coinName}
                                    coinPriceToDisplay={coinPriceToDisplay}
                                    id={id} />
                            </Grid>
                        </Grid>
                    </form>
                </Container>


            </Grid>
            <div style={{ textAlign: 'center' }}>
                <Button className={classes.detailToSearchButton} size="medium" variant="contained" onClick={() => navSearch()}><SearchIcon style={{fontSize: '35px'}}/></Button>
                <Button variant="contained" size="medium" className={classes.goHomeButton} onClick={() => goHome()}><HomeIcon style={{fontSize: '35px'}}/></Button>


            </div>


        </Container>
    );
}

export default CoinDetails;
