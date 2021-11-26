import React, {FC, useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {IPosts} from "../models/IPosts";
import Art from "../components/Art/Art";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {PostActionCreators} from "../store/reducers/posts/action-creators";

interface SearchParam {
    content: string;
}

const Search: FC = () => {
    const {find} = useTypedSelector(state => state.posts)
    const {content} = useParams<SearchParam>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(PostActionCreators.findPosts(content))
    }, [dispatch, content])

    return (
        <div className='Search'>
            <Container maxWidth="xl" sx={{mt: '20px'}}>
                {find.length > 0 ? (
                    <Grid
                        container
                        spacing={6}
                        columns={{xs: 1, sm: 4, md: 8, lg: 12, xl: 16}}
                    > {find.map((post: IPosts, index: number) => (
                                <Grid key={post.id + '_' + index} item
                                      xs={1}
                                      sm={4}
                                      md={4}
                                      lg={4}
                                      xl={4}
                                >
                                    <Art
                                        art={post}
                                    />
                                </Grid>
                    ))}
                    </Grid>
                ) : (
                    <Typography>Ничего не найдено</Typography>
                )}
            </Container>
        </div>
    );
};

export default Search;