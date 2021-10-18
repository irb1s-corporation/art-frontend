import React, {FC, useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import './Pages.scss';
import Art from "../components/Art/Art";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IPosts} from "../models/IPosts";

const Home: FC = () => {
    const navs: string[] = ['Главная', 'Видео', 'Лучшие фотографы'];
    const [activeNav, SetActiveNav] = useState(0);
    const {getPopular} = useActions()
    const {popular} = useTypedSelector(state => state.posts)
    useEffect(() => {
        getPopular()
    }, [])

    return (
        <React.Fragment>
            <Container>
                <div className='Home__nav'>
                    {navs.map((nav: string, index: number) =>
                        <div key={index} onClick={() => SetActiveNav(index)}
                             className={`nav ${activeNav === index ? 'active' : ''}`}>
                            {nav}
                        </div>
                    )}
                    <div className='Border'/>
                </div>
                <Grid container spacing={7}>
                    {popular.map((post: IPosts) => (
                        <Grid item xs={4}>
                            <Art
                                userAvatar={post.author.avatar} userName={post.author.name} description={post.about}
                                image={post.content}
                            />
                        </Grid>
                    ))
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Home;