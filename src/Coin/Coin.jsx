import React from "react";
import { useHistory } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "../components/styles/styles";

function Coin({ id, name, image, symbol, price, marketCap, priceChange }) {
  const history = useHistory();
  const classes = useStyles();

  const getDetails = (id) => {
    console.log("coin id:", id);
    history.push(`/coin-details/${id}`); //send to coin-details page with coin ID
  };

  return (
    <TableRow
      className={classes.tableRow}
      onClick={() =>
        getDetails(id, name, image, symbol, price, marketCap, priceChange)
      }
      key={id}
    >
      <TableCell className={classes.tableCell}>
        <img
          className={classes.coinIcon}
          src={image}
          style={{ paddingTop: "4px" }}
          alt="icon"
        />
      </TableCell>
      <TableCell className={classes.tableTickerCell}>
        {symbol.toUpperCase()}
      </TableCell>
      <TableCell className={classes.tablePriceCell}>${price}</TableCell>
      <TableCell className={classes.table24Cell}>
        {" "}
        {priceChange < 0 ? (
          <p className="downRed">
            <KeyboardArrowDownIcon style={{verticalAlign: '-17%'}} />
            {Math.abs(priceChange.toFixed(2))}%
          </p>
        ) : (
          <p className="upGreen">
            {" "}
            <KeyboardArrowUpIcon style={{verticalAlign: '-17%'}} /> {priceChange.toFixed(2)}%
          </p>
        )}
      </TableCell>
    </TableRow>
  );
}

export default Coin;
