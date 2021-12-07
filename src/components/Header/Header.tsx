import React, {ChangeEvent, FC, useState} from 'react';
import {Avatar, Button, IconButton, InputBase, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {ROOT_URL} from "../../config";
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router-dom";
import './Header.scss';


const Header: FC = () => {
    const {isAuth, user, isLoading} = useTypedSelector(state => state.auth);
    const {cartArts} = useTypedSelector(state => state.cart);
    const {favoriteArts} = useTypedSelector(state => state.favorites);
    const {setLoginModal, setRegModal} = useActions();
    const history = useHistory();
    const [searchContent, setSearchContent] = useState('')

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchContent(event.target.value)
    }
    const onClickEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            history.push('/search/' + searchContent)
        }
    }

    return (
        <header className='Header'>
                <div className='HeaderWrapper'>
                    <NavLink style={{color: "#171719"}} to={'/'}>
                        <div className='Header__logo'>
                            <div className='background'>
                                <BrushIcon sx={{fontSize: 30}}/>
                            </div>
                            <Typography variant='h5'>ART</Typography>
                        </div>
                    </NavLink>
                    <div className="Header__search">
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Поиск"
                            inputProps={{'aria-label': 'search'}}
                            onChange={onChange}
                            onKeyPress={onClickEnter}
                        />
                        <NavLink to={'/search/' + searchContent}>
                            <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </NavLink>
                    </div>
                    <div className='Header__menu'>
                        {isAuth ?
                            (
                                <React.Fragment>
                                    <NavLink to={'/create'}>
                                        <IconButton>
                                            <CreateIcon/>
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to={'/cart'}>
                                        <IconButton>
                                            <ShoppingCartIcon/>
                                            {cartArts.length > 0 && <div className='length'>{cartArts.length}</div>}
                                        </IconButton>
                                    </NavLink>
                                    <NavLink to={'/favorites'}>
                                        <IconButton>
                                            <FavoriteIcon/>
                                            {favoriteArts.length > 0 &&
                                            <div className='length'>{favoriteArts.length}</div>}
                                        </IconButton>
                                    </NavLink>
                                    {/*<IconButton>*/}
                                    {/*    <NotificationsIcon style={{color: '#171719'}}/>*/}
                                    {/*</IconButton>*/}
                                    <NavLink to={'/profile'}>
                                        <IconButton className='avatar' >
                                            <Avatar
                                                alt={user.nickname}
                                                src={user.avatar && ROOT_URL + 'avatar/' + user.avatar}
                                                sx={{width: 50, height: 50}}
                                            />
                                        </IconButton>
                                    </NavLink>
                                </React.Fragment>
                            )
                            :
                            (!isLoading &&
                                (
                                    <React.Fragment>
                                        <Button sx={{ml: 'auto', color: '#171719'}} variant="text"
                                                onClick={() => setLoginModal(true)}>
                                            Войти
                                        </Button>
                                        <Button sx={{ml: 'auto'}} variant="contained" onClick={() => setRegModal(true)}>
                                            Регистрация
                                        </Button>
                                    </React.Fragment>
                                )
                            )
                        }
                    </div>
                </div>
            </header>
    );
};

export default Header;