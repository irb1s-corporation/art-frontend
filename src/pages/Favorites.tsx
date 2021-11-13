import React, {FC, useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import Art from "../components/Art/Art";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {FavoritesActionCreators} from "../store/reducers/favorites/action-creators";
import {useDispatch} from "react-redux";

const Favorites: FC = () => {
    const dispatch = useDispatch()
    const {favoriteArts, FavoriteIsLoading} = useTypedSelector(state => state.favorites)
    const {token} = useTypedSelector(state => state.auth)

    useEffect(() => {
        dispatch(FavoritesActionCreators.FavoriteGet(token));
    }, [dispatch, token])

    return (
        <Container maxWidth="xl">
            <div className="Cart__header">
                <div className='title'>
                    <Typography variant="h4">
                        Избранное
                    </Typography>
                </div>
            </div>
            <div className="hr" style={{marginBottom: '2rem'}}/>
            {!FavoriteIsLoading ? (
                    favoriteArts.length > 0 ? (
                            <Grid
                                container
                                spacing={7}
                            >
                                {favoriteArts.map((post, index) => (
                                    post?.post &&
                                    <Grid key={index} item xs={4}>
                                        <Art
                                            art={post.post}
                                        />
                                    </Grid>
                                ))
                                }
                            </Grid>
                        )
                        : (<div style={{
                                margin: "15% 0",
                                textAlign: 'center'
                            }}>
                                <Typography variant='h4'>
                                    У вас нет избранных артов 😕
                                </Typography>
                            </div>
                        )
                )
                : <div className="Loader">
                    <span className="loader"/>
                </div>
            }
        </Container>
    );
};

export default Favorites;