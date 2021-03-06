import React, { useEffect, useState } from "react";
import useStyles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Typography, Grid, Button } from "@material-ui/core/";
import IconButton from "@mui/material/IconButton";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

import Table from "@material-ui/core/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Swal from "sweetalert2";

import UserDonutChart from "../UserDonutChart/UserDonutChart";

const UserHoldings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const holdings = useSelector((store) => store.holdingsReducer); //everything the user has in his database
  const cryptoList = useSelector((store) => store.cryptoListReducer); //full crypto list

  const [userHoldingsArray, setUserHoldingsArray] = useState([]);

  const [list, setList] = useState(false);
  const [totalDisp, setTotalDisp] = useState(); //total holding storage

  const classes = useStyles();

  let totalHolding = 0;

  //on load
  useEffect(() => {
    setUserHoldingsArray(holdings);
    dispatch({ type: "FETCH_USER_HOLDINGS", payload: store.user.id });
  }, []);

  //function to clean up held coins decimal chaos
  const fixHeldDecimals = (coinAmount) => {
    let value = Number(coinAmount);
    let res = coinAmount.split(".");
    if (res.length == 1 || res[1].length < 3) {
      value = value;
    }
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
  };

  //on delete button press, we go here for the SWAL warning
  const deleteWarn = (id, name) => {
    console.log("using swal to warn before delete");
    Swal.fire({
      title: `Remove all ${name}?`,
      text: "This position will be removed.",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#9333F0",
      confirmButtonText: "Yep!",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePress(id);
      }
    });
  };

  //if user confirms on SWAL warning:
  const handleDeletePress = (id) => {
    dispatch({
      type: "DELETE_HOLDING",
      payload: { id: id, user_id: store.user.id },
    });
  };

  const handleModifyPress = (name, id, held) => {
    history.push(`/modify/${id}/${name}/${held}`); //send to modify page with coin ID
  };

  const handleAddClick = () => {
    history.push("/search");
  };

  //function to get total value per coin
  const getCurrentCryptoValue = (data, id, count) => {
    let finalValue = 0;
    let target = data.filter(function (data) {
      return data["id"] == id;
    });
    if (target.length > 0) {
      totalToDisplay(count * target[0]["current_price"]); //send to GRAND TOTAL function
      finalValue = (count * target[0]["current_price"]).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }); //format price display
    } else {
      finalValue = "N/A"; //show 'N/A' on any given holding if price unavailable
    }
    return finalValue;
  };

  let runningTotalArray = [];
  let totalToSend = 0;
  const totalToDisplay = (incomingNumber) => {
    if (incomingNumber == undefined) {
    } else {
      runningTotalArray.push(incomingNumber);
    }
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    totalToSend = runningTotalArray.reduce(reducer);

    return <div>{totalToSend}</div>;
  };

  //function that displays clickable donut chart
  const changeView = () => {
    setList(!list);
    console.log("clicked the div:", list);
  };

  return (
    <div>
      {holdings.length === 0 ? (
        <Typography className={classes.assetHeadline} variant="h4" style={{ color: "#F70C8A" }}>
          No Assets Yet
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={classes.userTableHeader}>
                <TableCell style={{ padding: "2px" }} className={classes.userTableHeaderCell}>
                  Coin
                </TableCell>
                <TableCell style={{ padding: "2px" }} className={classes.userTableHeaderCell}>
                  Held
                </TableCell>
                <TableCell style={{ padding: "2px" }} className={classes.userTableHeaderCell}>
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.holdingsTableBody}>
              {holdings.map((holding) => {
                return (
                  <TableRow key={holding.id}>
                    <TableCell style={{ padding: "3px" }} className={classes.holdingSymbol}>
                      {holding.symbol}
                    </TableCell>
                    <TableCell style={{ padding: "3px" }} className={classes.holdingAmount}>
                      {fixHeldDecimals(holding.coins_held)}
                    </TableCell>
                    <TableCell style={{ padding: "3px" }} className={classes.holdingVal}>
                      ${getCurrentCryptoValue(cryptoList, holding.coin_id, holding.coins_held)}
                    </TableCell>
                    <TableCell style={{ padding: "3px" }} className={classes.holdingDelete}>
                      <IconButton
                        variant="contained"
                        size="small"
                        className={classes.holdingsDeleteButton}
                        onClick={() => deleteWarn(holding.id, holding.name)}>
                        <DeleteForeverIcon
                          style={{
                            color: "#9A0D01",
                            transform: "scale(1.6)",
                            paddingLeft: "12px",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ padding: "3px" }} className={classes.holdingModify}>
                      <IconButton
                        variant="contained"
                        size="small"
                        className={classes.holdingsModifyButton}
                        onClick={() => handleModifyPress(holding.name, holding.id, holding.coins_held)}>
                        <ImportExportIcon
                          style={{
                            color: "#D4C215",
                            transform: "scale(1.6)",
                            paddingRight: "7px",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Typography
        style={{
          marginTop: "15px",
          marginBottom: "0px",
          fontSize: "34px",
          textAlign: "center",
          fontFamily: "Poppins",
        }}
        variant="h4">
        Total:{" "}
        <b>
          {/* User grand total is HERE: */}$
          {totalToSend.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </b>
      </Typography>
      <br />
      <Grid container justifyContent="center">
        <Grid item className={classes.addButton}>
          <Button
            variant="outlined"
            size="medium"
            onClick={handleAddClick}
            style={{
              margin: "15px",
              fontSize: "24px",
              fontWeight: "bolder",
              backgroundColor: "#5C9827",
              color: "white",
            }}>
            <b>Add</b>
          </Button>
        </Grid>

        <Grid item style={{ margin: "15px" }}>
          <UserDonutChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserHoldings;
