import React, {FC, useState} from 'react';
import Header from "../components/Header/Header";
import {Container, Grid} from "@mui/material";

import './Pages.scss';
import Art from "../components/Art/Art";

const Home: FC = () => {
    const navs: string[] = ['Главная', 'Видео', 'Лучшие фотографы'];
    const [activeNav, SetActiveNav] = useState(0);
    return (
        <React.Fragment>
            <Header/>
            <Container>
                <div className='Home__nav'>
                    {navs.map((nav: string, index: number) =>
                        <div onClick={() => SetActiveNav(index)}
                             className={`nav ${activeNav === index ? 'active' : ''}`}>
                            {nav}
                        </div>
                    )}
                    <div className='Border'/>
                </div>
                <Grid container spacing={7}>
                    <Grid item xs={4}>
                        <Art userAvatar={'https://avatars.githubusercontent.com/u/67830422?v=4'} userName={'irb1s'}
                             description={'Whale Art'}
                             image={'https://cdn.dribbble.com/users/1090926/screenshots/16550417/media/cee6f416b315ce7495836ecfdc0c149d.png?compress=1&resize=800x600'}
                        />
                    </Grid>

                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Home;