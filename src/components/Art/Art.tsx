import React, {FC} from 'react';
import {Avatar, CardActions, CardHeader, CardMedia, IconButton, Card, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import {ROOT_URL} from "../../config";
import './Art.scss'
import {useActions} from "../../hooks/useActions";
import {IPosts} from "../../models/IPosts";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface PropsArt {
    art: IPosts
}

const Art: FC<PropsArt> = (props) => {
    const {CartAddArt, FavoriteAddArt, FavoriteDeleteArt, CartDeleteArt} = useActions();
    const {cartArts} = useTypedSelector(state => state.cart)
    const {favoriteArts} = useTypedSelector(state => state.favorites)

    const chekCart = (id: number) => {
        for (let i = 0; i < cartArts.length; i++) {
            if (cartArts[i].id === id) {
                return true
            }
        }
        return false
    }
    const chekFavorites = (id: number) => {
        for (let i = 0; i < favoriteArts.length; i++) {
            if (favoriteArts[i].id === id) {
                return true
            }
        }
        return false
    }

    return (
        <Card className='Card'>
            <CardHeader
                className='Card__header'
                avatar={
                    <Avatar
                        alt="User Avatar"
                        src={ROOT_URL + 'avatar/' + props.art.author.avatar}
                    />
                }
                title={props.art.author.name && props.art.author.surname ? props.art.author.name && props.art.author.surname : props.art.author.nickname}
                subheader={props.art.title}
            />
            <CardMedia
                className='Card__media'
                component="img"
                height="350"
                image={ROOT_URL + 'posts/' + props.art.content}
                alt={props.art.content}
            />
            <CardActions className='Card__actions' disableSpacing>
                <IconButton aria-label="add to favorites"
                            onClick={() => !chekFavorites(props.art.id) ? FavoriteAddArt(props.art) : FavoriteDeleteArt(props.art.id)}>
                    {chekFavorites(props.art.id) ? <FavoriteIcon style={{color: '#FBCB9C'}}/> : <FavoriteBorderIcon/>}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <div className='to-cart'>
                    <div className='price'>
                        <Typography>
                            {props.art.price}руб.
                        </Typography>
                    </div>
                    <IconButton
                        onClick={() => !chekCart(props.art.id) ? CartAddArt(props.art) : CartDeleteArt(props.art.id)}
                        sx={{ml: '10px'}}>
                        {chekCart(props.art.id) ? <CheckIcon/> : <AddShoppingCartIcon/>}
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
};

export default Art;