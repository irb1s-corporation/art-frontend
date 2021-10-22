import React, {FC, useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import './Pages.scss';
import Art from "../components/Art/Art";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IPosts} from "../models/IPosts";

const Home: FC = () => {
    const links: string[] = ['Популярные'];
    const [activeLink, SetActiveLink] = useState(0);
    const {getPopular} = useActions()
    const {popular} = useTypedSelector(state => state.posts)
    useEffect(() => {
        getPopular()
    }, [])

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <div className='PageNav'>
                    {links.map((nav: string, index: number) =>
                        <div key={index} onClick={() => SetActiveLink(index)}
                             className={`nav ${activeLink === index ? 'active' : ''}`}>
                            {nav}
                        </div>
                    )}
                    <div className='Border'/>
                </div>
                <Grid
                    container
                    justifyContent="space-between"
                    spacing={7}
                >
                    {popular.map((post: IPosts, index: number) => (
                        <Grid key={post.id + '_' + index} item xs={4}>
                            <Art
                                userAvatar={post.author.avatar}
                                userName={post.author.name.length != 0 ? post.author.name : post.author.nickname}
                                description={post.title}
                                price={post.price}
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