import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import useStyles from '../styles/styles';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@material-ui/core"

import TableContainer from '@mui/material/TableContainer';

import { useHistory } from 'react-router-dom';
import Coin from '../../Coin/Coin';
import UserHoldings from '../UserHoldings/UserHoldings';

function UserPage() {

    const cryptoList = useSelector(store => store.cryptoListReducer);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const shortenBigNumber = (value) => {  //important for market cap on details page!
        const suffixes = ["", "K", "M", "B", "T"];
        let suffixNum = Math.floor(("" + value).length / 3);
        let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(4));
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(2);
        }
        return shortValue + suffixes[suffixNum];
    }

    const renderPage = () => {
        if (cryptoList.length === 0) {
            return <div><img width="150px" src="./images/bitcoinLogoSpinning.gif" /></div>
        }
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_CRYPTO_LIST' }); //FETCHING MASTER LIST
        console.log('user id is:', user)
    }, [])

    return (

        <div className="userContainer">
            <Typography variant="h4" style={{ paddingTop: '0' }} className={classes.pageMainHeader}>Hi {user.username}!</Typography>
            {/* <p>Your ID is: {user.id}</p> */}

            <Container className={classes.tableMain}>
                <Paper className={classes.assetHeader} elevation={6}>
                    <Typography variant="h5" style={{ margin: '10px', paddingTop: '5px', fontSize: '25px', fontFamily: 'Poppins', color: '#216091' }}>Your Positions:</Typography>

                    <UserHoldings />

                </Paper>
                <Typography variant="h3" style={{ fontFamily: 'Righteous', marginTop: '10px', color: '#3175a9' }}><b>Explore!</b></Typography>
                <Typography style={{ fontFamily: 'Poppins', marginBottom: '10px', marginTop: '4px', fontSize: '20px' }}><b>Top 250 Cryptocurrencies</b></Typography>
                <TableContainer sx={{ maxHeight: 470 }}>
                    <Table className="center" stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow className={classes.tableHeader}>
                                <TableCell className={classes.tableHeader}>Icon</TableCell>
                                {/* <TableCell className={classes.tableCell}>Name</TableCell> */}
                                <TableCell className={classes.tableHeader}>Ticker</TableCell>
                                <TableCell className={classes.tableHeader}>Current Price</TableCell>
                                {/* <TableCell className={classes.tableCell}>Market Cap</TableCell> */}
                                <TableCell className={classes.tableHeader}>24h Change</TableCell>
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
                                        price={coin.current_price.toLocaleString(undefined,
                                            { 'minimumFractionDigits': 0, 'maximumFractionDigits': 2 })}
                                        marketCap={shortenBigNumber(coin.market_cap)}
                                        priceChange={coin.price_change_percentage_24h}
                                    />

                                )
                            })}

                        </TableBody>
                    </Table>
                    <Container>
                        <Typography style={{ paddingTop: "40px" }} variant="h2">{renderPage()}</Typography>
                    </Container>
                </TableContainer>
            </Container>

            {/* <LogOutButton className="btn" /> */}
        </div>
    );
}

// this allows us to use <App /> in index.js
export default UserPage;
