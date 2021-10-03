import React, {FC, useState} from 'react';
import {Avatar, Button, IconButton, InputBase, Paper, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import './Header.scss';
import LoginModal from "../modals/LoginModal";
import RegModal from "../modals/RegModal";

const Header: FC = () => {
    const [profileMenu, setProfileMenu] = useState(false);
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const [loginModal, setLoginModal] = useState(false);
    const [regModal, setRegModal] = useState(false);
    return (
        <React.Fragment>
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
                        {isAuth ?
                            <React.Fragment>
                                <Button style={{backgroundColor: '#FBCB9C'}} variant="contained" href="/create">
                                    опубликовать art
                                </Button>
                                <IconButton href="/cart">
                                    <ShoppingCartIcon style={{color: '#171719'}}/>
                                </IconButton>
                                <IconButton>
                                    <NotificationsIcon style={{color: '#171719'}}/>
                                </IconButton>
                                <IconButton>
                                    <Avatar
                                        alt="User Avatar"
                                        src=''
                                        sx={{width: 40, height: 40}}
                                    />
                                </IconButton>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Button sx={{ml: 'auto'}} variant="contained"
                                        onClick={() => setLoginModal(true)}>
                                    Войти
                                </Button>
                                <Button sx={{ml: 'auto'}} variant="contained"
                                        onClick={() => setRegModal(true)}>
                                    Регистрация
                                </Button>
                            </React.Fragment>
                        }
                    </div>
                </div>
                {profileMenu &&
                <div className='Header__profileMenu'>
                    <ul className='menu'>
                        <li className='list'>Выйти</li>
                    </ul>
                </div>
                }
            </header>
            <LoginModal open={loginModal} close={() => setLoginModal(false)}/>
            <RegModal open={regModal} close={() => setRegModal(false)}/>
        </React.Fragment>
    );
};

export default Header;