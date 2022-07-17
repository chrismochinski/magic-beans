import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "../styles/styles";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton } from "@material-ui/core";

export default function VolumeModal() {
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
        <DialogTitle id="alert-dialog-title">{"What is Volume?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The volume of a particular Cryptocurrency is simply the total amount of coins traded in the last 24 hours.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
