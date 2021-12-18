import React, {FC, useEffect, useState} from 'react';
import {Avatar, Button, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {ROOT_URL} from "../config";
import {useParams} from "react-router-dom";
import axios from "axios";
import {IPosts} from "../models/IPosts";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {NavLink} from "react-router-dom";


interface SearchParam {
    id: string;
}

const ArtPage: FC = () => {
    const {id} = useParams<SearchParam>()
    const [post, setPost] = useState<IPosts>()
    const {token, isAuth} = useTypedSelector(state => state.auth);
    const [userLikePost, setUserLikePost] = useState(false)
    const {FavoriteCreate, setLoginModal, setBuyArtModal} = useActions();
    const hashtags = post?.about.split(' ').filter((item) => item[0] === '#')

    useEffect(() => {
        const aboba = async () => {
            await axios.get('/posts/id/' + id, {
                baseURL: ROOT_URL,
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            }).then((res) => {
                setPost(res.data)
            }).catch((error) => {
                console.log(error.response)
            })
        }
        aboba()
        if (token) {
            axios.post('/views', {postId: id}, {
                baseURL: ROOT_URL,
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    Authorization: 'Bearer ' + token
                }
            })
        } else {
            setUserLikePost(false)
        }

    }, [id, token])

    const LikeHandler = () => {
        return () => {
            if (token) {
                setUserLikePost(!userLikePost)
                FavoriteCreate(Number(id), token)
            } else {
                setLoginModal(true)
            }
        }
    }

    const CartHandler = () => {
        return () => {
            if (isAuth) {
                if (post?.id) {
                    setBuyArtModal(true, post.id)
                }
            } else {
                setLoginModal(true)
            }
        }
    }

    return (
        <div className='ArtPage'>
            {post &&
            <div className="flex-wrapper">
                <div className='summary'>
                    <article className='card-image'>
                        <img
                            src={ROOT_URL + 'posts/' + post.content}
                            alt={post.content}
                        />
                    </article>
                </div>
                <div className='main'>
                    <div className='main__header'>
                        <section className='art-header'>
                            <div className='info'>
                                <Typography variant='h3'>{post.title}</Typography>
                                <div className='description'>
                                    {post?.about.replace(/\s?#[\w-]+/g, '')}
                                    <div className='hashtags'>
                                        {hashtags && hashtags.map((hashtag, index) => (
                                                <NavLink style={{color: '#171719'}} key={index}
                                                         to={'/search?content=' + hashtag.replace(/#/gi, '')}>
                                                    <div className='hashtag'>{hashtag} </div>
                                                </NavLink>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='art-counts'>
                            <div className='count'>
                                <VisibilityIcon sx={{mr: '5px'}}/>
                                <div>{post?.views?.length} просмотров</div>
                            </div>
                            <div onClick={LikeHandler()} className='count likes'>
                                <FavoriteIcon sx={{mr: '5px', color: userLikePost ? "#FBCB9C" : "#171719"}}/>
                                <div>{post.likes.length} лайков</div>
                            </div>
                        </section>
                        <section className='art-author'>
                            <div className='title'>Автор</div>
                            <div className='name'>
                                <Avatar
                                    sx={{mr: '10px', width: 50, height: 50}}
                                    alt={post.author.nickname}
                                    src={post.author.avatar && ROOT_URL + 'avatar/' + post.author.avatar}
                                />
                                <div>{post.author.nickname}</div>
                            </div>
                        </section>
                    </div>
                    <div className='main__footer'>
                        <section className='price'>
                            <Typography variant='h4'>{post.price} руб.</Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={CartHandler()}
                            >
                                <AccountBalanceWalletIcon sx={{color: "#FFF", mr: '5px'}}/>
                                Купить
                            </Button>
                        </section>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default ArtPage;