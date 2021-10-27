import React, {FC, useState,} from 'react';
import {Box, Button, Container, Tab, Tabs, Typography} from "@mui/material";
import ProfileSettings from "./ProfileSettings";
import {NavLink} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile: FC = () => {
    // const links: string[] = ['Настройки', 'Покупки', 'Ваши ART', 'Финансы'];
    const [activeLink, SetActiveLink] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        SetActiveLink(newValue);
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl">
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
                {activeLink === 0 ? (<ProfileSettings/>) : null}
            </Container>
        </React.Fragment>
    );
};

export default Profile;