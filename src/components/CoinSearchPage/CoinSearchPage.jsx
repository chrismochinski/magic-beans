// this used to be InfoPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Card, CardMedia, CardContent, CardActions, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Paper from "@material-ui/core/Paper";
import { useHistory } from 'react-router-dom';
import './CoinSearchPage.css';
import SearchIcon from '@mui/icons-material/Search';


import useStyles from '../styles/styles';


function CoinSearchPage() {

  const [elevation, setElevation ] = useState('4')

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cryptoList = useSelector(store => store.cryptoListReducer);

  console.log('cryptolistreducer is:', cryptoList)

  const [newSearch, setNewSearch] = useState('');
  const [searchArray, setSearchArray] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    console.log('new search is:', newSearch)
    for (let i = 0; i < cryptoList.length; i++) {
      if (
        cryptoList[i].id === newSearch ||
        cryptoList[i].symbol === newSearch ||
        cryptoList[i].name === newSearch ||
        cryptoList[i].image === newSearch) {
        searchArray.unshift(cryptoList[i])
      } else {
        console.log('no results')
      }


    }
    console.log(searchArray)
    setNewSearch('');
  }
  // id, name, image, symbol, price, marketCap, priceChange 
  // const getDetails = (card) => {
  //   console.log('card.id from search page:', card)
  //   dispatch({ type: 'TEMP_COIN_DETAILS', payload: card }); 
  //   navToDetailsPage(card)
  // }

  const getDetails = (card) => {
    history.push(`/coin-details/${card.id}`)

  }

  useEffect(() => {
    dispatch({ type: 'FETCH_CRYPTO_LIST' }); //API call for clean top 200 list
  }, [])

  const mouseEnter = () => {
    setElevation(12)
  }

  const mouseLeave = () => {
    setElevation(5)
  }



  return (

    <div>
      {/* <Paper elevation={1} className={classes.searchPaper}> */}
        <Container maxWidth="sm" className={classes.mainSearchPage}>
          <Typography className={classes.pageHeader} variant="h4" >Crypto Search!</Typography>
          <form onSubmit={handleChange} style={{textAlign: 'center'}}>
            <TextField
              id="standard-basic"
              variant="standard"
              size="large"
              type="text"
              required
              value={newSearch}
              className="coinInput"
              label="Search For A Coin"
              onChange={(event) => setNewSearch(event.target.value)}
            />
            <div>
              <Button variant="contained" size="medium" type="submit" className={classes.searchButton}>Search</Button>
            </div>
          </form>




          {searchArray.map((card) => (
            <Grid style={{ paddingTop: '40px', width: '90%', marginLeft: 'auto', marginRight: 'auto' }} item key={card}>
              <Card 
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
              className={classes.card} elevation={elevation} >
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  height="140"
                  image={card.image}
                  title="Crypto Icon"
                  alt="Image Broken"
                />
                <CardContent className={classes.cardContent}>
                  <Grid>
                    <Grid item className={classes.floatLeft} xs={12} s={10} md={10} lg={10} xl={10}>
                      <Typography variant="h6">
                        {card.name} || ${card.symbol.toUpperCase()} || ${card.current_price.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.floatRight} xs={12} s={2} md={2} lg={2} xl={2}>
                        <Button style={{padding: '10px', marginTop: '10px'}} onClick={() => getDetails(card)} variant="outlined" size="large" color="primary"><b>Details</b></Button>
                    </Grid>
                  </Grid>
                </CardContent>

              </Card>
            </Grid>
          ))}
          {/* <h1>{search}</h1> */}
          {/* <h1>{newCoinName}</h1> */}
          {/* <img src={newCoinImageSource} //deletelater /> */} 


        </Container>
      {/* </Paper> */}
    </div>
  )
}

export default CoinSearchPage;
