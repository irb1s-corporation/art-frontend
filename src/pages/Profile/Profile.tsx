import React, {ChangeEvent, FC, useRef, useState,} from 'react';
import {Avatar, Box, Container, IconButton, Tab, Tabs, Typography} from "@mui/material";
import ProfileSettings from "./ProfileSettings";
import ProfileUserPosts from "./ProfileUserPosts";
import {ROOT_URL} from "../../config";
import CreateIcon from "@mui/icons-material/Create";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile: FC = () => {
    const [activeLink, SetActiveLink] = useState(0);
    const inputFile = useRef(document.createElement("input"));
    const {token, user} = useTypedSelector(state => state.auth);
    const {saveAvatar} = useActions();

    const avatarChange = (file: any) => {
        saveAvatar(token, file)
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        SetActiveLink(newValue);
    };

    return (
        <div className='Profile'>
            <div className='Profile__header'>
                <div className='banner'>
                    <div className='background'>
                        <img
                            src='https://lh3.googleusercontent.com/vtZXDR51ibkUx6v2XRf3imqsL-bUzy7tALBcjrwx0fNJywcMCqK_bVIfrvdlKQ5sysboHA23kGiwbgsGb5c_6ROGsyzc-SZURrtqRA=h600'/>
                    </div>
                    <div className='wrapper-avatar'>
                        <div className='avatar'>
                            <div className='background'/>
                            <label>
                                <IconButton
                                    onClick={() => inputFile.current.click()}
                                >
                                    <Avatar
                                        alt={user.nickname}
                                        src={ROOT_URL + 'avatar/' + user.avatar}
                                        sx={{width: 150, height: 150}}
                                    />
                                    <CreateIcon className='icon'/>
                                </IconButton>
                                <input
                                    ref={inputFile}
                                    type='file' accept=".jpeg, .jpg, .png, .gif"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => avatarChange(e.target.files)}
                                    hidden
                                />
                            </label>
                            <Typography variant='h6'>
                                {user.nickname}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <Container sx={{mt: '40px'}}
                       maxWidth="xl"
            >
                <div className='PageNav'>
                    <Box sx={{borderColor: 'divider'}}>
                        <Tabs value={activeLink} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Настройки" {...a11yProps(0)} />
                            <Tab label="Покупки" {...a11yProps(1)} />
                            <Tab label="Ваши ART" {...a11yProps(2)} />
                            <Tab label="Финансы" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <div className='Border'/>
                </div>
                {activeLink === 0 ? (<ProfileSettings/>) : activeLink === 2 ? (<ProfileUserPosts/>) : null}
            </Container>
        </div>
    );
};

export default Profile;