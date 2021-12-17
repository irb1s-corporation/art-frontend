import React, {useEffect, useState} from 'react';
import {ROOT_URL} from "../../config";
import {
    Avatar, Box, IconButton,
    Tab, Tabs,
    Typography
} from "@mui/material";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ProfileActionCreators} from "../../store/reducers/profile/action-creators";
import './Profile.scss';
import ProfileGuestPosts from "./ProfileGuestPosts";
import ProfileGuestCollection from "./ProfileGuestCollection";
import CollectionsIcon from "@mui/icons-material/Collections";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

interface Param {
    nickname: string;

}

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
                    </Tabs>
                </Box>
                <div className='Border'/>
            </div>
            {activeLink === 0 ? (<ProfileGuestCollection/>) : activeLink === 1 ? (<ProfileGuestPosts/>) : null}
        </React.Fragment>
    )
}

const ProfileGuest = () => {
    const {userForGuest} = useTypedSelector(state => state.profile);
    const {nickname} = useParams<Param>()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ProfileActionCreators.getUserInfoForGuest(nickname))
    }, [dispatch, nickname])

    return (
        <div className='Profile'>
            <div className='Profile__header'>
                <div className='banner'>
                    <div className='background'>
                        {userForGuest.banner &&
                        <img alt='background' src={ROOT_URL + 'banner/' + userForGuest.banner}/>}
                    </div>
                </div>
                <div className='content'>
                    <div className='avatar'>
                        <div className='wrapper-photo'>
                            <div className='photo'>
                                <label>
                                    <IconButton sx={{cursor: 'default'}}>
                                        <Avatar
                                            alt={userForGuest.nickname}
                                            src={userForGuest.avatar && ROOT_URL + 'avatar/' + userForGuest.avatar}
                                            sx={{width: 150, height: 150}}
                                        />
                                        <div className='photo-background'/>
                                    </IconButton>
                                </label>
                            </div>
                        </div>
                        <Typography className='nickname' variant='h5'>
                            {userForGuest.nickname}
                        </Typography>
                    </div>
                </div>
            </div>
            <ProfileNav/>
        </div>
    );
};

export default ProfileGuest;