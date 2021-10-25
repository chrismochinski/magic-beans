// this used to be InfoPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LayersClearIcon from "@mui/icons-material/LayersClear";

import useStyles from "../styles/styles";

function CoinSearchPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cryptoList = useSelector((store) => store.cryptoListReducer);

  console.log("cryptolistreducer is:", cryptoList);

  const [newSearch, setNewSearch] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_CRYPTO_LIST" }); //API call for top 250 list (number subject to change)
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    console.log("new search is:", newSearch);
    for (let i = 0; i < cryptoList.length; i++) {
      //search for crypto by id/name/symbol
      if (
        cryptoList[i].id === newSearch ||
        cryptoList[i].symbol === newSearch ||
        cryptoList[i].name === newSearch ||
        cryptoList[i].image === newSearch ||
        cryptoList[i].id === newSearch.toUpperCase() ||
        cryptoList[i].symbol === newSearch.toUpperCase() ||
        cryptoList[i].name === newSearch.toUpperCase() ||
        cryptoList[i].image === newSearch.toUpperCase() ||
        cryptoList[i].id === newSearch.toLowerCase() ||
        cryptoList[i].symbol === newSearch.toLowerCase() ||
        cryptoList[i].name === newSearch.toLowerCase() ||
        cryptoList[i].image === newSearch.toLowerCase() ||
        cryptoList[i].id[0] === newSearch.toLowerCase()
      ) {
        searchArray.unshift(cryptoList[i]);
      } else {
        console.log("no results");
      }
    }
    console.log(searchArray);
    setNewSearch("");
  };

  const clearSearchArray = () => {
    setSearchArray([]);
  };

  const getDetails = (card) => {
    history.push(`/coin-details/${card.id}`);
  };

  const goHome = () => {
    history.push("/user");
  };

  return (
    <div>
      <Container maxWidth="sm" className={classes.mainSearchPage}>
        <img
          src="/images/mb-logo-search.png"
          className="modLogo"
          style={{ marginBottom: "10px" }}
          width="270px"
        />

        <form
          onSubmit={handleChange}
          style={{
            marginTop: "20px",
            textAlign: "center",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TextField
            inputProps={{ style: { fontSize: 30 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            id="standard-basic"
            variant="standard"
            autoComplete="off"
            type="text"
            required
            value={newSearch}
            className="coinInput"
            label="Search For A Coin"
            onChange={(event) => setNewSearch(event.target.value)}
          />
          <div>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              className={classes.searchButton}
            >
              Search
            </Button>
            <Button
              variant="contained"
              size="medium"
              className={classes.goHomeButton}
              onClick={() => goHome()}
            >
              <HomeIcon style={{ fontSize: "35px" }} />
            </Button>
            {searchArray.length > 0 ? (
              <Button
                variant="contained"
                size="medium"
                className={classes.clearSearchButton}
                onClick={() => clearSearchArray()}
              >
                <LayersClearIcon style={{ fontSize: "35px" }} />
              </Button>
            ) : (
              <Typography></Typography>
            )}
          </div>
        </form>

        {searchArray.map((card) => (
          <Grid
            style={{
              paddingTop: "40px",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            item
            key={card.id}
          >
            <Card className={classes.card} elevation={5}>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                height="120"
                image={card.image}
                title="Crypto Icon"
                alt="Image Broken"
              />
              <CardContent className={classes.cardContent} style={{}}>
                <Grid>
                  <Grid
                    item
                    className={classes.floatCenter}
                    xs={12}
                    s={10}
                    md={10}
                    lg={10}
                    xl={10}
                  >
                    <Typography variant="h5" className={classes.cardText}>
                      {card.name} <span className={classes.pipe}>|</span>{" "}
                      <span
                        style={{ fontFamily: "Righteous", borderWidth: "4px" }}
                      >
                        {card.symbol.toUpperCase()}
                      </span>{" "}
                      <span className={classes.pipe}>|</span> #
                      {card.market_cap_rank}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    onClick={() => getDetails(card)} //moved from child element (MUI Button)
                    className={classes.floatCenter}
                    xs={12}
                    s={2}
                    md={2}
                    lg={2}
                    xl={2}
                  >
                    <Button
                      className={classes.detailsButton}
                      variant="outlined"
                      size="large"
                      color="primary"
                    >
                      <b>Details</b>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Container>
      {/* </Paper> */}
    </div>
  );
}

export default CoinSearchPage;
