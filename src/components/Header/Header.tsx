import React, {FC, useState} from 'react';
import {Avatar, IconButton, InputBase, Paper, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.scss';

const Header: FC = () => {
    return (
        <header className='Header'>
            <div className='HeaderWrapper'>
                <div className='Header__logo'>
                    <BrushIcon sx={{fontSize: 40}}/>
                    <Typography variant='h4'>Art Shop</Typography>
                </div>
                <Paper
                    component="form"
                    sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, margin: 'auto'}}
                >
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        placeholder="Search"
                        inputProps={{'aria-label': 'search'}}
                    />
                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
                <div className='Header__menu'>
                    <IconButton>
                        <ShoppingCartIcon style={{color: '#171719'}}/>
                    </IconButton>
                    <IconButton>
                        <NotificationsIcon style={{color: '#171719'}}/>
                    </IconButton>
                    <IconButton>
                        <Avatar
                            alt="User Avatar"
                            src=""
                            sx={{width: 40, height: 40}}
                        />
                    </IconButton>
                </div>
            </div>
        </header>
    );
};

export default Header;