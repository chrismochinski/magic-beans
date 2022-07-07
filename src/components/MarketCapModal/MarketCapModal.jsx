import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "../styles/styles";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@material-ui/core";

export default function MarketCapModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton style={{ marginBottom: 0, padding: "3px" }}>
        <HelpOutlineIcon className={classes.question} onClick={handleClickOpen} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"What is Market Capitalization?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Market capitalization is <b>the total value of a cryptocurrency</b>. This is calculated by multiplying the
            price of the cryptocurrency with the number of coins in circulation.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
