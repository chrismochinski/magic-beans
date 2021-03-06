import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer, IconButton, Container, Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";

import ListItem from "@mui/material/ListItem";

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <img src="./images/icons8-hamburger-58.png" width="50px" style={{ marginRight: "12px" }} />
      </IconButton>

      <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <div className="closeDrawerButton" style={{ textAlign: "center" }}>
          <IconButton style={{ marginBottom: "10px", textAlign: "center" }} onClick={() => setOpen(false)}>
            <ChevronRightIcon className="hamburgerLink" />
          </IconButton>
        </div>
        <Divider />
        <div>
          <ListItem onClick={() => setOpen(false)}>
            <Link to="/user">
              <HomeIcon className="hamburgerIcons" />
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpen(false)}>
            <Link to="/about">
              <InfoIcon className="hamburgerIcons" />
            </Link>
          </ListItem>
          <ListItem onClick={() => setOpen(false)}>
            <Link to="/search">
              <SearchIcon className="hamburgerIcons" />
            </Link>
          </ListItem>
          <ListItem onClick={() => handleLogoutClick()}>
            <Link to="/home">
              <LogoutIcon className="hamburgerIcons" />
            </Link>
          </ListItem>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default Hamburger;
