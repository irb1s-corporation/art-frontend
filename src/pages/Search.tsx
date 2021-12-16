import React, {FC, useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {IPosts} from "../models/IPosts";
import Art from "../components/Art/Art";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {PostActionCreators} from "../store/reducers/posts/action-creators";
import {useLocation} from "react-router-dom";

function useQuery() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Search: FC = () => {
    const {find} = useTypedSelector(state => state.posts)
    const query = useQuery();
    const content = String(query.get("content"))
    const dispatch = useDispatch()
    useEffect(() => {
        if (content) {
            dispatch(PostActionCreators.findPosts(content))
        }
    }, [dispatch, query, content])

    return (
        <div className='Search'>
            <Container maxWidth="xl" sx={{mt: '20px'}}>
                <Typography className='Search__title' variant='h6'>
                    Найдено {find.length} товаров
                </Typography>
                {find.length > 0 && (
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
                )}
            </Container>
        </div>
    );
};

export default Search;