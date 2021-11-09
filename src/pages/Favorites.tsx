import React, {FC, useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {IPosts} from "../models/IPosts";
import Art from "../components/Art/Art";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Favorites: FC = () => {
    const {favoriteArts} = useTypedSelector(state => state.favorites)
    const {token} = useTypedSelector(state => state.auth)
    const {FavoriteGet} = useActions()
    useEffect(() => {
        FavoriteGet(token)
        console.log("Favorites")
    }, [])
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
            {favoriteArts.length > 0 &&
            <Grid
                container
                spacing={7}
            >
                {favoriteArts.length > 0 ?
                    favoriteArts.map((post: IPosts, index) => (
                        post.post &&
                        <Grid key={index} item xs={4}>
                            <Art
                                art={post?.post}
                            />
                        </Grid>
                    ))
                    :
                    <div style={{
                        margin: "15% 0",
                        textAlign: 'center'
                    }}>
                        <Typography variant='h4'>
                            Корзина пустая 😕
                        </Typography>
                    </div>
                }
            </Grid>
            }
        </Container>
    );
};

export default Favorites;