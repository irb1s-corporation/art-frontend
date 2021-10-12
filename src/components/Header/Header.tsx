import React, {FC, useRef, useState} from 'react';
import {Avatar, Button, IconButton, InputBase, Paper, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {Transition} from "react-transition-group";
import {ROOT_URL} from "../../config";
import {NavLink} from "react-router-dom";
import {useOnClickOutside} from "usehooks-ts";
import './Header.scss';


const Header: FC = () => {
    const ref = useRef(null)
    const refAvatar = useRef(null)
    const [profileMenu, setProfileMenu] = useState(false);
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {setLoginModal, setRegModal, logout} = useActions();

    const clickInside = () => {
        setProfileMenu(!profileMenu)
    };

    useOnClickOutside(ref, () => {
        setProfileMenu(false)
    })

    return (
        <React.Fragment>
            <header className='Header'>
                <div className='HeaderWrapper'>
                    <NavLink style={{color: "#171719"}} to={'/'}>
                        <div className='Header__logo'>
                            <BrushIcon sx={{fontSize: 40}}/>
                            <Typography variant='h4'>Art Shop</Typography>
                        </div>
                    </NavLink>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, margin: 'auto'}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Поиск"
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
                                <IconButton ref={ref} onClick={clickInside}>
                                    <Avatar
                                        alt="User Avatar"
                                        src={ROOT_URL + 'avatar/' + user?.avatar}
                                        sx={{width: 50, height: 50}}
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
                                    <NavLink to={'/profile'}>
                                        <Button variant='text'
                                                className='list'>
                                            Профиль
                                            <PersonIcon/>
                                        </Button>
                                    </NavLink>
                                </div>
                                <div className='hr'/>
                                <div className='list'>
                                    <Button variant='text' onClick={() => {
                                        logout()
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