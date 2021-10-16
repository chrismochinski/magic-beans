import React, { useEffect } from 'react'
import useStyles from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'

import { Typography, Container, Grid, Button } from '@material-ui/core/'
import holdingsReducer from '../../redux/reducers/holdings.reducer'



const UserHoldings = () => {

    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const holdings = useSelector(store => holdingsReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_HOLDINGS', payload: store.user.id }); 
        kennyLoggins();
    }, [])

    const kennyLoggins = () => {
        console.log('store is:', store)
        console.log
    }

    const classes = useStyles();


    return (
        <div>
            
        <Typography>User Holdings will go here for user #{store.user.id}</Typography>

        </div>
    )
}

export default UserHoldings
