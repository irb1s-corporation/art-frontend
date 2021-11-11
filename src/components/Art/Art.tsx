import React, {FC, useEffect, useState} from 'react';
import {Avatar, CardActions, CardHeader, CardMedia, IconButton, Card, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
    const {CartAddArt, FavoriteCreate} = useActions();
    const {token, user} = useTypedSelector(state => state.auth);
    const {cartArts} = useTypedSelector(state => state.cart)
    const [userLikePost, setUserLikePost] = useState(false)
    const [postCart, setPostCart] = useState(false)


    useEffect(() => {
        if (props?.art.likes.find((userLike) => userLike.userId === user.id)) {
            setUserLikePost(true)
        } else {
            setUserLikePost(false)
        }
        if (props?.art.inCart.find((postCart) => postCart.userId === user.id)) {
            setPostCart(true)
        } else {
            setPostCart(false)
        }
    }, [props.art, user.id])

    const chekCart = (id: number) => {
        for (let i = 0; i < cartArts.length; i++) {
            if (cartArts[i].id === id) {
                return true
            }
        }
        return false
    }

    const LikeHandler = () => {
        setUserLikePost(!userLikePost)
        FavoriteCreate(props.art.id, token)
    }
    const CartHandler = () => {
        setPostCart(!postCart)
        // CartAddArt(props.art.id, token)
        // FavoriteCreate(props.art.id, token)
    }

    return (
        <Card className='Card'>
            <CardHeader
                className='Card__header'
                avatar={
                    <Avatar
                        alt="User Avatar"
                        src={ROOT_URL + 'avatar/' + props.art?.author?.avatar}
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
                            onClick={() => LikeHandler()}>
                    {userLikePost ? <FavoriteIcon style={{color: '#FBCB9C'}}/> : <FavoriteBorderIcon/>}
                </IconButton>
                <div className='to-cart'>
                    <div className='price'>
                        <Typography>
                            {props.art.price}руб.
                        </Typography>
                    </div>
                    <IconButton
                        onClick={() => CartHandler()}
                        sx={{ml: '10px'}}>
                        {chekCart(props.art.id) ? <CheckIcon/> : <AddShoppingCartIcon/>}
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
};

export default Art;