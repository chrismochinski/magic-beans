import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';


import React, { useState } from 'react'
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SwipeableDrawer } from '@mui/material';
import { Container } from '@mui/material';
import { Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';





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
                <MenuIcon onClick={() => setOpen(true)} />
            </IconButton>

            <SwipeableDrawer
                anchor="right"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)} >

                <div>
                    <IconButton>
                        <ChevronRightIcon className="hamburgerLink" onClick={() => setOpen(false)} />
                    </IconButton>
                </div>
                <Divider />
                <div>
                    <ListItem>
                        <Link className="hamburgerLink" to="/user">
                            <HomeIcon onClick={() => setOpen(false)} />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link className="hamburgerLink" to="/info">
                            <SearchIcon onClick={() => setOpen(false)} />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <LogoutIcon className="hamburgerLink" onClick={() => handleLogoutClick()} />
                        {/* <LogOutButton className="navLink" /> */}
                    </ListItem>
                </div>

            </SwipeableDrawer>
        </div >)
}

export default Hamburger;
