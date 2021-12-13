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
import {useHistory} from "react-router-dom";

interface PropsArt {
    art: IPosts
}

const Art: FC<PropsArt> = React.memo((props) => {
    const {FavoriteCreate, AddArtToCart, setLoginModal} = useActions();
    const {token, user, isAuth} = useTypedSelector(state => state.auth);
    const [userLikePost, setUserLikePost] = useState(false)
    const [postCart, setPostCart] = useState(false)
    const history = useHistory()
    useEffect(() => {
        if (isAuth) {
            if (props?.art.likes.find((userLike) => userLike.userId === user.id)) setUserLikePost(true)
            else setUserLikePost(false)
            if (props?.art.inCart.find((postCart) => postCart.userId === user.id)) setPostCart(true)
            else setPostCart(false)
        } else {
            setUserLikePost(false)
            setPostCart(false)
        }
    }, [props.art, user.id, isAuth])

    const LikeHandler = () => {
        return () => {
            if (isAuth) {
                setUserLikePost(!userLikePost)
                FavoriteCreate(props.art.id, token)
            } else {
                setLoginModal(true)
            }
        }
    }

    const CartHandler = () => {
        return () => {
            if (isAuth) {
                setPostCart(!postCart)
                AddArtToCart(props.art.id, token)
            } else {
                setLoginModal(true)
            }
        }
    }
    const ToCart = () => {
        return () => {
            history.push('/art/'+ props.art.id )
        }
    }

    return (
        <Card className='Card'>
            <CardHeader
                className='Card__header'
                avatar={
                    <Avatar
                        alt={props.art?.author.nickname}
                        src={props.art.author.avatar && ROOT_URL + 'avatar/' + props.art.author.avatar}
                    />
                }
                title={props.art.author.nickname}
                subheader={props.art.title}
            />
            <CardMedia
                onClick={ToCart()}
                sx={{cursor:"pointer"}}
                className='Card__media'
                component="img"
                height="350"
                image={ROOT_URL + 'posts/' + props.art.content}
                alt={props.art.content}
            />
            <CardActions className='Card__actions' disableSpacing>
                <IconButton aria-label="add to favorites"
                            onClick={LikeHandler()}>
                    {userLikePost ? <FavoriteIcon style={{color: '#FBCB9C'}}/> : <FavoriteBorderIcon/>}
                </IconButton>
                <div className='likesCount'>{props.art.likes.length}</div>
                <div className='to-cart'>
                    <div className='price'>
                        <Typography>
                            {props.art.price}руб.
                        </Typography>
                    </div>
                    <IconButton
                        onClick={CartHandler()}
                        sx={{ml: '10px'}}>
                        {postCart ? <CheckIcon/> : <AddShoppingCartIcon/>}
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
});

export default Art;