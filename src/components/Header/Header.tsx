import React, {FC, useState} from 'react';
import {Avatar, Button, ButtonGroup, IconButton, InputBase, Paper, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import './Header.scss';
import {Transition} from "react-transition-group";

const Header: FC = () => {
    const [profileMenu, setProfileMenu] = useState(false);
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {setLoginModal, setRegModal, logout} = useActions();

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
                                <IconButton onClick={() => setProfileMenu(!profileMenu)}>
                                    <Avatar
                                        alt="User Avatar"
                                        src={user.avatar}
                                        sx={{width: 40, height: 40}}
                                    />
                                </IconButton>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Button sx={{ml: 'auto', color: '#171719'}} variant="text"
                                        onClick={() => setLoginModal(true)}>
                                    Войти
                                </Button>
                                <Button sx={{ml: 'auto'}} variant="contained" onClick={() => setRegModal(true)}>
                                    Регистрация
                                </Button>
                            </React.Fragment>
                        }
                    </div>
                </div>
                <Transition
                    in={profileMenu}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                >
                    {(state) =>
                        <div className={`Header__profileMenu ${state}`}>
                            <nav className='menu'>
                                <div className='list'>
                                    <Button variant='text' onClick={() => {
                                        logout()
                                        setProfileMenu(false)
                                    }}
                                            className='list'>
                                        Профиль
                                        <PersonIcon/>
                                    </Button>
                                </div>
                                <div className='hr'/>
                                <div className='list'>
                                    <Button variant='text' onClick={() => {
                                        logout()
                                        setProfileMenu(false)
                                    }}
                                            className='list'>
                                        Выйти
                                        <ExitToAppIcon/>
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    }
                </Transition>
            </header>
        </React.Fragment>
    );
};

export default Header;