import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import useStyles from '../styles/styles';
import Button from '@material-ui/core/Button';

import Table from "@material-ui/core/Table";
import TableContainer from '@mui/material/TableContainer';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useHistory } from 'react-router-dom';
import Coin from '../../Coin/Coin';
import axios from 'axios';


function UserPage() {

    const cryptoList = useSelector(store => store.cryptoListReducer);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    // const [coins, setCoins] = useState([])
    const history = useHistory();
    // const [isLoading, setIsLoading] = useState(false);


    const shortenBigNumber = (value) => {  //important for market cap on details page!
        const suffixes = ["", "K", "M", "B", "T"];
        let suffixNum = Math.floor(("" + value).length / 3);
        let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(4));
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(2);
        }
        return shortValue + suffixes[suffixNum];
    }

    const handleAddClick = () => {
        console.log('add button clicked')
        history.push('/search') //important add this page for search, SHARE WITH HOURGLASS HAMBURGER LINK
    }


    // const renderPage = () => { //updated might not be able to use this
    //     if (isLoading) {
    //         return <div>Loading Crypto List...</div>
    //     }
    // }


    //updated HEADED TO ROOT /SAGA/REDUCER NOW...

    useEffect(() => {
        dispatch({ type: 'FETCH_CRYPTO_LIST' }); //fix unmute this!
    }, [])





    return (

        <div className="userContainer">
            <Typography variant="h4" style={{paddingTop: '0'}} className={classes.pageHeader}>Welcome, {user.username}!</Typography>
            {/* <p>Your ID is: {user.id}</p> */}

            <Container className={classes.tableMain}>
                <Paper className={classes.assetHeader} elevation={10}>
                    <Grid container spacing={2}>
                        <Grid item className={classes.assetHeadline} xs={12} s={10} md={10} lg={10} xl={10}>
                            <Typography variant="h4" style={{ color: '#F70C8A' }}>No Assets Yet</Typography>
                        </Grid>
                        <Grid item className={classes.addButton} xs={12} s={2} md={2} lg={2} xl={2}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleAddClick}
                                style={{ backgroundColor: '#3f51b5', color: 'white' }}><b>Add</b></Button>
                        </Grid>
                    </Grid>
                </Paper>


                <TableContainer sx={{ maxHeight: 470 }}>
                    <Table className="center" stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow className={classes.tableHeader}>
                                <TableCell className={classes.tableHeader}>Icon</TableCell>
                                {/* <TableCell className={classes.tableCell}>Name</TableCell> */}
                                <TableCell className={classes.tableHeader}>Ticker</TableCell>
                                <TableCell className={classes.tableHeader}>Current Price</TableCell>
                                {/* <TableCell className={classes.tableCell}>Market Cap</TableCell> */}
                                <TableCell className={classes.tableHeader}>24h Price Change</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>


                            {cryptoList.map(coin => {    //cryptoList = top coins from redux store
                                return (
                                    <Coin key={coin.id}
                                        id={coin.id}
                                        image={coin.image}
                                        name={coin.name}
                                        symbol={coin.symbol}
                                        price={coin.current_price.toLocaleString()}
                                        marketCap={shortenBigNumber(coin.market_cap)}
                                        priceChange={coin.price_change_percentage_24h}
                                    />

                                )
                            })}

                        </TableBody>
                    </Table>
                    {/* <Container> */}
                        {/* <Typography style={{ padding: "40px" }} variant="h5">{renderPage()}</Typography> */}
                    {/* </Container> */}
                </TableContainer>
            </Container>

            {/* <LogOutButton className="btn" /> */}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
