import React, {FC} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {IPosts} from "../models/IPosts";
import Art from "../components/Art/Art";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Favorites: FC = () => {
    const {favoriteArts} = useTypedSelector(state => state.favorites)

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
                justifyContent="space-between"
                spacing={7}
            >
                {favoriteArts.map((post: IPosts,) => (
                    <Grid key={post.id} item xs={4}>
                        <Art
                            art={post}
                        />
                    </Grid>
                ))
                }
            </Grid>
            }
        </Container>
    );
};

export default Favorites;