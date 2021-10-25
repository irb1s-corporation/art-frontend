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

interface PropsArt {
    art: IPosts
}

const Art: FC<PropsArt> = (props) => {
    const {addArt} = useActions();
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
                title={props.art.author}
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
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon/>
                    {/*<FavoriteIcon/>*/}
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
                    <IconButton onClick={() => addArt(props.art)} sx={{ml: '10px'}}>
                        <AddShoppingCartIcon/>
                        {/*<CheckIcon/>*/}
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
};

export default Art;