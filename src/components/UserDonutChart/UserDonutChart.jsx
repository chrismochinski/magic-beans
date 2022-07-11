import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { Container, Grid } from "@material-ui/core";
import useStyles from "../styles/styles";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDonutChart() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const holdings = useSelector((store) => store.holdingsReducer); //everything the user has in their database

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return;
  };

  let namesArray = [];
  const loopNames = () => {
    for (let item of holdings) {
      namesArray.push(item.name);
    }
    return namesArray;
  };

  let donutArray = [];
  const loopHoldings = () => {
    let donutArray = [];
    for (let item of holdings) {
      let val = (item.coins_held * item.per_coin_val).toFixed(2);
      donutArray.push(val);
    }
    return donutArray;
  };

  return (
    <div>
      <Button
        style={{
          textAlign: "center",
          fontSize: "24px",
          paddingBottom: "0px",
          backgroundColor: "#9333F0",
          color: "white",
        }}
        variant="contained"
        size="medium"
        onClick={handleClickOpen}
        className={classes.pieButton}
      >
        <b>
          <DonutLargeIcon
            style={{
              transform: "scale(1.5)",
              paddingTop: "8px",
              paddingBottom: "2px",
            }}
          />
        </b>
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Doughnut
          style={{ padding: "5px" }}
          data={{
            labels: loopNames(),
            datasets: [
              {
                data: loopHoldings(),
                backgroundColor: [
                  "#613BED",
                  "#44E059",
                  "#D747F5",
                  "#3ED2F7",
                  "#F7EE3E",
                  "#CDD6E3",
                  "#F2DFC2",
                  "#FA6534",
                ],
              },
            ],
          }}
          height={400}
          width={400}
          options={{
            plugins: {
              legend: true,
            },
            animations: true,
            maintainAspectRatio: true,
          }}
        />

        <DialogActions>
          <Container style={{ textAlign: "right", marginBottom: "5px" }}>
            <Button
              style={{
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#9333F0",
                color: "white",
              }}
              className={classes.dialogueButtons}
              onClick={handleClose}
            >
              Close
            </Button>
          </Container>
        </DialogActions>
      </Dialog>
    </div>
  );
}
