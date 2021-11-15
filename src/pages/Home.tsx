import React, {FC, useEffect,} from 'react';
import {
    Container,
    Grid,
} from "@mui/material";
import './Pages.scss';
import Art from "../components/Art/Art";
import {IPosts} from "../models/IPosts";
import {useDispatch} from "react-redux";
import {PostActionCreators} from "../store/reducers/posts/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Filter from "../components/Filter/Filter";


const Home: FC = () => {
    const {popular} = useTypedSelector(state => state.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(PostActionCreators.getPopular())
    }, [dispatch])

    return (
        <div className='Home '>
            <Filter value={false}/>
            <Container maxWidth="xl" sx={{mt: '20px'}}>
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
            </Container>
        </div>
    );
};

export default Home;