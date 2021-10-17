import React, { useEffect, useState } from 'react'
import useStyles from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'

import { Typography, Container, Grid, Button } from '@material-ui/core/';
import './UserHoldings.css';


const UserHoldings = () => {

    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const holdings = useSelector(store => store.holdingsReducer); //everything the user has in his database
    const cryptoList = useSelector(store => store.cryptoListReducer); //full crypto list

    const [userHoldingsArray, setUserHoldingsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();


    useEffect(() => {
        setIsLoading(true)
        dispatch({ type: 'FETCH_USER_HOLDINGS', payload: store.user.id });
    }, [])


    //function to get total value per coin
    const getCurrentCryptoValue = (data, id, count) => {
        let target = data.filter(function (data) {
            return (data['id'] == id);
        });
        if (target.length > 0) {
            return (count * target[0]['current_price']).toFixed(2);
        } else {
            return 'N/A';
        }
    }

    //function to clean up held coins decimal chaos
    const fixHeldDecimals = (coinAmount) => {
        let value = Number(coinAmount);
        let res = coinAmount.split('.');
        if(res.lentgh == 1 || res[1].length < 3) {
            value = value.toFixed(2)
        }
        return value;
    }

    


    return (
        <div >
            
            {holdings.length === 0 ? <Typography className={classes.assetHeadline} variant="h4" style={{ color: '#F70C8A' }}>No Assets Yet</Typography> :

                <ul className='userAssetList'>
                    {holdings.map(holding => {
                        return (
                            
                                <li key={holding.id}>
                                    <Typography className='userAssetTypography' >{holding.symbol} - {fixHeldDecimals(holding.coins_held)} - {getCurrentCryptoValue(cryptoList, holding.coin_id, holding.coins_held)}</Typography>
                                </li>
                         
                        )
                    })}
                </ul>
            }

        </div>
    )
}

export default UserHoldings
