import React, { useEffect, useState } from 'react'
import useStyles from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { Typography, Container, Grid } from '@material-ui/core/';
import IconButton from '@mui/material/IconButton';

import './UserHoldings.css';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImportExportIcon from '@mui/icons-material/ImportExport';

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


    useEffect(() => {
        setIsLoading(true)
        setUserHoldingsArray(holdings)
        dispatch({ type: 'FETCH_USER_HOLDINGS', payload: store.user.id });
    }, [])


    //function to get total value per coin
    const getCurrentCryptoValue = (data, id, count) => {
        let finalValue;
        let target = data.filter(function (data) {
            return (data['id'] == id);
        });
        if (target.length > 0) {
            finalValue = (count * target[0]['current_price']).toLocaleString(undefined,
                { 'minimumFractionDigits': 0, 'maximumFractionDigits': 2 });
        } else {
            finalValue = 'N/A';
        }
        return finalValue;
    }

    //function to clean up held coins decimal chaos
    const fixHeldDecimals = (coinAmount) => {
        let value = Number(coinAmount);
        let res = coinAmount.split('.');
        if(res.length == 1 || res[1].length < 3) {
            value = value.toFixed(2)
        }
        return value.toLocaleString(undefined,
            { 'minimumFractionDigits': 0, 'maximumFractionDigits': 2 });
    }

    //on delete button press, we go here
    const deleteWarn = (id) => {
        console.log('using swal to warn before delete');
        Swal.fire({
            title: 'Are you sure?',
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
                Swal.fire(
                    'Deleted!',
                    'Position Removed.',
                    'success'
                )
            }
        })
    }

    const handleDeletePress = (id) => {
        console.log('handleDeletePress pushed! id is:', id, 'and User id is:', store.user.id);
        dispatch({ 
            type: 'DELETE_HOLDING', 
            payload: {id: id, user_id: store.user.id} 
        });
        // setTimeout(() => {
        //     dispatch({type: 'FETCH_USER_HOLDINGS'})
        // }, 2000);
      

    }

    const handleModifyPress = () => {
        console.log('handleModifyPress pushed!')
    }

    


    return (
        <div >
            
            {holdings.length === 0 ? <Typography className={classes.assetHeadline} variant="h4" style={{ color: '#F70C8A' }}>No Assets Yet</Typography> :

                <ul className='userAssetList'>
                    {holdings.map(holding => {
                        return (
                            
                                <li key={holding.id}>
                                    <Typography style={{fontSize: '20px', fontWeight: 'bold'}} className='userAssetTypography' >{holding.symbol} - {fixHeldDecimals(holding.coins_held)} - ${getCurrentCryptoValue(cryptoList, holding.coin_id, holding.coins_held)}</Typography>
                                    <IconButton variant="contained" size="small" className={classes.holdingsDeleteButton} onClick={() => deleteWarn(holding.id)}><DeleteForeverIcon style={{color: 'red', transform: 'scale(1.3)'}}/></IconButton>
                                    <IconButton variant="contained" size="small" className={classes.holdingsModifyButton} onClick={() => handleModifyPress()}><ImportExportIcon style={{color: 'yellow', transform: 'scale(1.3)' }} /></IconButton>
                                </li>
                         
                        )
                    })}
                </ul>
            }

        </div>
    )
}

export default UserHoldings
