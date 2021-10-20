import React, {FC} from 'react';
import {Avatar, CardActions, CardHeader, CardMedia, IconButton, Card} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {ROOT_URL} from "../../config";

interface PropsArt {
    userAvatar: string,
    userName: string,
    description: string,
    image: string
}

const Art: FC<PropsArt> = (props) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="User Avatar"
                        src={ROOT_URL + 'avatar/' + props.userAvatar}
                    />
                }
                title={props.userName}
                subheader={props.description}
            />
            <CardMedia
                component="img"
                height="350"
                image={ROOT_URL + 'posts/' + props.image}
                alt={props.image}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon/>
                    {/*<FavoriteIcon/>*/}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Art;