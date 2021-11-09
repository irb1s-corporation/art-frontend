import React, {FC, useEffect, useState} from 'react';
import {Box, Container, Grid, Tab, Tabs} from "@mui/material";
import './Pages.scss';
import Art from "../components/Art/Art";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IPosts} from "../models/IPosts";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Home: FC = () => {
    const [activeLink, SetActiveLink] = useState(0);
    const {popular} = useTypedSelector(state => state.posts)
    const {getPopular} = useActions()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        SetActiveLink(newValue);
    };

    useEffect(() => {
        getPopular()
        console.log("Home")
    }, [])

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className='PageNav'>
                    <Box sx={{borderColor: 'divider'}}>
                        <Tabs value={activeLink} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Популярные" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <div className='Border'/>
                </div>

                {activeLink === 0 ?
                    <Grid
                        container
                        spacing={7}
                    >
                        {popular.map((post: IPosts, index: number) => (
                            <Grid key={post.id + '_' + index} item xs={4}>
                                <Art
                                    art={post}
                                />
                            </Grid>
                        ))
                        }
                    </Grid>
                    : null
                }
            </Container>
        </React.Fragment>
    );
};

export default Home;