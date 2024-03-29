import React, {FC, useEffect, useRef, useState,} from 'react';
import {Avatar, Box, Button, IconButton, Tab, Tabs, Typography} from "@mui/material";
import ProfileUserPosts from "./ProfileUserPosts";
import {ROOT_URL} from "../../config";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CreateIcon from "@mui/icons-material/Create";
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import CollectionsIcon from '@mui/icons-material/Collections';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ProfileActionCreators} from "../../store/reducers/profile/action-creators";

import {useDispatch} from "react-redux";
import './Profile.scss';
import ProfileUserCollection from "./ProfileUserCollection";
import WalletCard from "../../components/Wallet/WalletCard";


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProfileNav = () => {
    const [activeLink, SetActiveLink] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        SetActiveLink(newValue);
    };
    return (
        <React.Fragment>
            <div className='PageNav'>
                <Box sx={{borderColor: 'divider'}}>
                    <Tabs value={activeLink} onChange={handleChange} aria-label="icon position tabs example" centered>
                        <Tab icon={<CollectionsIcon/>} label={"Коллекция"} {...a11yProps(0)} />
                        <Tab icon={<FormatPaintIcon/>} label="Созданные" {...a11yProps(1)} />
                        <Tab icon={<AccountBalanceWalletIcon/>} label="Финансы" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <div className='Border'/>
            </div>
            {activeLink === 0 ? (<ProfileUserCollection/>) : activeLink === 1 ? (
                <ProfileUserPosts/>) : activeLink === 2 ? <WalletCard/> : null}
        </React.Fragment>
    )
}

const Profile: FC = () => {
    const dispatch = useDispatch()
    const {token, user} = useTypedSelector(state => state.auth);

    useEffect(() => {
        dispatch(ProfileActionCreators.getUserPosts(token))
    }, [dispatch, token]);

    const inputFile = useRef(document.createElement("input"));
    const inputFileBanner = useRef(document.createElement("input"));
    const {saveAvatar, saveBanner, logout} = useActions();
    const avatarChange = () => {
        return () => {
            saveAvatar(token, inputFile.current.files);
        }
    }
    const bannerChange = () => {
        return () => {
            saveBanner(token, inputFileBanner.current.files)
        }
    }
    const clickInput = (input: React.MutableRefObject<HTMLInputElement>) => {
        return () => {
            input.current.click()
        }
    }

    return (
        <div className='Profile'>
            <div className='Profile__header'>
                <div onClick={clickInput(inputFileBanner)} className='banner'>
                    <div className='background'>
                        {user.banner && <img alt='background' src={ROOT_URL + 'banner/' + user.banner}/>}
                    </div>
                    <CreateIcon className='icon'/>
                    <div className='shadow'/>
                    <input
                        ref={inputFileBanner}
                        type='file' accept=".jpeg, .jpg, .png, .gif"
                        onChange={bannerChange()}
                        hidden
                    />
                </div>
                <div className='content'>
                    <div className='avatar'>
                        <div className='wrapper-photo'>
                            <div className='photo'>
                                <label>
                                    <IconButton
                                        onClick={clickInput(inputFile)}
                                    >
                                        <Avatar
                                            alt={user.nickname}
                                            src={user.avatar && ROOT_URL + 'avatar/' + user.avatar}
                                            sx={{width: 150, height: 150}}
                                        />
                                        <CreateIcon className='icon'/>
                                        <div className='shadow'/>
                                        <div className='photo-background'/>
                                    </IconButton>
                                    <input
                                        ref={inputFile}
                                        type='file' accept=".jpeg, .jpg, .png, .gif"
                                        onChange={avatarChange()}
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>
                        <Typography className='nickname' variant='h5'>
                            {user.nickname}
                        </Typography>
                    </div>
                    <Button variant="contained" onClick={() => logout()}>
                        Выйти
                        <ExitToAppIcon sx={{ml: "20px"}}/>
                    </Button>
                </div>
            </div>
            <ProfileNav/>
        </div>
    );
};

export default Profile;