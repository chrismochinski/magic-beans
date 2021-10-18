import React, { useEffect, useState } from 'react'
import useStyles from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { Typography, Container, Grid, Button } from '@material-ui/core/';
import IconButton from '@mui/material/IconButton';

import './UserHoldings.css';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import Table from "@material-ui/core/Table";
import TableContainer from '@mui/material/TableContainer';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Swal from 'sweetalert2'; //sweetalert 2 import


const UserHoldings = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const holdings = useSelector(store => store.holdingsReducer); //everything the user has in his database
    const cryptoList = useSelector(store => store.cryptoListReducer); //full crypto list

    const [userHoldingsArray, setUserHoldingsArray] = useState([]);
    const [valueToDisplay, setValueToDisplay] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();

    let totalHolding = 0;

    //on load
    useEffect(() => {
        setIsLoading(true)
        setUserHoldingsArray(holdings)
        dispatch({ type: 'FETCH_USER_HOLDINGS', payload: store.user.id });
    }, [])


    //function to clean up held coins decimal chaos
    const fixHeldDecimals = (coinAmount) => {
        let value = Number(coinAmount);
        let res = coinAmount.split('.');
        if (res.length == 1 || res[1].length < 3) {
            value = value.toFixed(2)
        }
        return value.toLocaleString(undefined,
            { 'minimumFractionDigits': 0, 'maximumFractionDigits': 2 });
    }

    //on delete button press, we go here for the SWAL warning
    const deleteWarn = (id, name) => {
        console.log('using swal to warn before delete');
        Swal.fire({
            title: 'Remove ',
            text: "This position will be removed.",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yep!',
            cancelButtonText: 'On Second Thought...'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeletePress(id);
                // Swal.fire(
                //     'Deleted!',
                //     'Position Removed.',
                //     'success'
                // )
            }
        })
    }

    //if user confirms on SWAL warning:
    const handleDeletePress = (id) => {
        console.log('handleDeletePress pushed! id is:', id, 'and User id is:', store.user.id);
        dispatch({
            type: 'DELETE_HOLDING',
            payload: { id: id, user_id: store.user.id }
        });
    }

    const handleModifyPress = () => {
        console.log('handleModifyPress pushed!')
    }


    const handleAddClick = () => {
        console.log('add button clicked')
        history.push('/search') //important add this page for search, SHARE WITH HOURGLASS HAMBURGER LINK
    }




    //function to get total value per coin
    const getCurrentCryptoValue = (data, id, count) => {
        let finalValue = 0;
        let target = data.filter(function (data) {
            return (data['id'] == id);
        });
        if (target.length > 0) {
            totalToDisplay((count * target[0]['current_price']))
            finalValue = (count * target[0]['current_price']).toLocaleString(undefined,
                { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 });
        } else {
            finalValue = 'N/A';
        }
        return finalValue;
    }

    let runningTotalArray = [];
    let totalToSend = 0;
    const totalToDisplay = (incomingNumber) => {
        if (incomingNumber == undefined) {
            console.log('still zero...')
        } else {
            console.log('incoming number:', incomingNumber)
            runningTotalArray.push(incomingNumber)
            console.log('running total is:', runningTotalArray)
        }
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        totalToSend = runningTotalArray.reduce(reducer)
        console.log('total to send:', totalToSend)
        return (
            <div>{totalToSend}</div>
        )
    }

    return (
        <div>


            {holdings.length === 0 ? <Typography className={classes.assetHeadline} variant="h4" style={{ color: '#F70C8A' }}>No Assets Yet</Typography> :




                <TableContainer >
                    <Table> 
                        <TableHead>
                            <TableRow className={classes.userTableHeader}>
                                    <TableCell style={{padding: '3px'}} className={classes.userTableHeaderCell} >COIN</TableCell>
                                    <TableCell style={{padding: '3px'}}  className={classes.userTableHeaderCell}>HELD</TableCell>
                                    <TableCell style={{padding: '3px'}}  className={classes.userTableHeaderCell}>VAL</TableCell>
                                    {/* <TableCell className={classes.userTableHeaderCell}></TableCell>
                                    <TableCell className={classes.userTableHeaderCell}></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.holdingsTableBody}>
                                    {holdings.map(holding => {
                                        return (

                                            <TableRow key={holding.id}>
                                                <TableCell style={{padding: '3px'}} className={classes.holdingSymbol}>{holding.symbol}</TableCell> 
                                                <TableCell style={{padding: '3px'}} className={classes.holdingAmount}>{fixHeldDecimals(holding.coins_held)}</TableCell> 
                                                <TableCell style={{padding: '3px'}} className={classes.holdingVal}>${getCurrentCryptoValue(cryptoList, holding.coin_id, holding.coins_held)}</TableCell> 
                                                <TableCell style={{padding: '3px'}} className={classes.holdingDelete}><IconButton variant="contained" size="small" className={classes.holdingsDeleteButton} onClick={() => deleteWarn(holding.id)}><DeleteForeverIcon style={{ color: 'red', transform: 'scale(1.6)', paddingLeft: '15px' }} /></IconButton></TableCell> 
                                                <TableCell style={{padding: '3px'}} className={classes.holdingModify}><IconButton variant="contained" size="small" className={classes.holdingsModifyButton} onClick={() => handleModifyPress()}><ImportExportIcon style={{ color: 'yellow', transform: 'scale(1.6)' }} /></IconButton></TableCell> 
                                            </TableRow>
                                        )
                                    })}
                        </TableBody>
                    </Table>
                </TableContainer>



            }
            <Grid container justifyContent="center" >
                <Grid item>
                    <Typography style={{marginTop: '15px', fontSize: '30px'}}variant="h4">Total: <b>${totalToSend.toLocaleString(undefined,
                        { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 })}</b></Typography>
                </Grid>
                <Grid item className={classes.addButton} xs={12} s={2} md={2} lg={2} xl={2}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddClick}
                        className={classes.addPositionButton}><b>Add</b></Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default UserHoldings
