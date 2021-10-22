import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Container, Grid } from "@material-ui/core";
import useStyles from "../styles/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialogue({
  handleAddCoins,
  coinAmount,
  id,
  coinName,
  coinPriceToDisplay,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseCancel = () => {
    setOpen(false);
    return;
  };

  const handleCloseConfirm = () => {
    setOpen(false);
    handleAddCoins();
  };

  return (
    <div>
      <Button
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          backgroundColor: "green",
          color: "white",
        }}
        variant="contained"
        size="medium"
        className={classes.addPositionButton}
        onClick={handleClickOpen}
      >
        ADD
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <img
          className={classes.dialogueLogo}
          src="/images/magic-beans-logo.png"
        />
        <DialogTitle
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "22px" }}
        >{`Confirm purchase of ${coinAmount} ${coinName} at $${coinPriceToDisplay} each?`}</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textAlign: "center", fontSize: "16px" }}
            id="alert-dialog-slide-description"
          >
            (you can always modify this later)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Container style={{ textAlign: "center", marginBottom: "25px" }}>
            <Button
              style={{
                margin: "4px",
                textAlign: "center",
                fontSize: "14px",
                backgroundColor: "#5C9827",
                color: "white",
              }}
              className={classes.dialogueButtons}
              onClick={handleCloseConfirm}
            >
              Confirm!
            </Button>
            <Button
              style={{
                margin: "4px",
                textAlign: "center",
                fontSize: "14px",
                backgroundColor: "#9333F0",
                color: "white",
              }}
              className={classes.dialogueButtons}
              onClick={handleCloseCancel}
            >
              Cancel
            </Button>
          </Container>
        </DialogActions>
      </Dialog>
    </div>
  );
}
