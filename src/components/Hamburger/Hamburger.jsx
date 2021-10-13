import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';


import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer, IconButton, Container, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListItem from '@mui/material/ListItem';





const Hamburger = () => { //idea

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch({ type: 'LOGOUT' })
        setOpen(false)
    }

    return (
        <div>
            <IconButton>
                <MenuIcon className="hamburgerIcon" onClick={() => setOpen(true)} />
            </IconButton>

            <SwipeableDrawer
                anchor="right"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)} >

                <div className="closeDrawerButton" style={{textAlign: 'center'}}>
                    <IconButton  style={{marginBottom: '10px', textAlign: 'center'}} onClick={() => setOpen(false)}>
                        <ChevronRightIcon className="hamburgerLink"/>
                    </IconButton>
                </div>
                <Divider />
                <div>
                    <ListItem>
                        <Link to="/user">
                            <HomeIcon className="hamburgerLink" onClick={() => setOpen(false)} />
                        </Link >
                    </ListItem>
                    <ListItem>
                        <Link  to="/coin-search">
                            <SearchIcon className="hamburgerLink" onClick={() => setOpen(false)} />
                        </Link >
                    </ListItem>
                    <ListItem>
                        <Link  to="/home">
                            <LogoutIcon className="hamburgerLink" onClick={() => handleLogoutClick()} />
                        </Link >
                        {/* <LogOutButton className="navLink" /> */}
                    </ListItem>
                </div>

            </SwipeableDrawer>
        </div >)
}

export default Hamburger;
