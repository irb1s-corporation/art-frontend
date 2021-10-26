import React, {FC} from 'react';
import {Button, Container, IconButton, Typography} from "@mui/material";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IPosts} from "../models/IPosts";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {NavLink} from "react-router-dom";
import {ROOT_URL} from "../config";
import {useActions} from "../hooks/useActions";

const Cart: FC = () => {
    const {arts, price} = useTypedSelector(state => state.cart)
    const {isLoading} = useTypedSelector(state => state.auth);
    const {deleteArt, deleteAllArt} = useActions()

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className="Cart__header">
                    <div className='title'>

                        <Typography variant="h4">
                            Корзина
                        </Typography>
                    </div>

                    <Button className='clear' onClick={() => deleteAllArt()} variant='text'>
                        <DeleteIcon/>
                        <Typography variant="h6">
                            Очистить корзину
                        </Typography>
                    </Button>
                </div>
                <div className="hr"/>
                <div className='Cart__arts'>
                    <Container maxWidth="lg">
                        {arts.length > 0 ?
                            arts.map((post: IPosts, index) =>
                                <React.Fragment key={post.id + "_" + index}>
                                    <div className='art'>
                                        <div className='content'>
                                            <img alt={post.content} src={ROOT_URL + 'posts/' + post.content}/>
                                        </div>
                                        <div className='aboutArt'>
                                            <div className='title'>
                                                <Typography variant='h6'>
                                                    {post.title}
                                                </Typography>
                                            </div>
                                            <div className='description'>
                                                {post.about}
                                            </div>
                                        </div>
                                        <IconButton onClick={() => deleteArt(post.id)} className='delete'>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                    </div>
                                    {arts.length !== index + 1 && <div className='hrSmall'/>}
                                </React.Fragment>
                            ) :
                            <div style={{
                                margin: "15% 0",
                                textAlign: 'center'
                            }}>
                                <Typography variant='h4'>
                                    Корзина пустая 😕
                                </Typography>
                            </div>

                        }
                    </Container>
                </div>
                {arts.length > 0 && (
                    <div className="Cart__price">
                        <Typography variant={'h5'}>Итого: {price}руб.</Typography>
                    </div>
                )}
                <div className="hr"/>
                <div className='Cart__footer'>
                    <NavLink to={'/'}>
                        <Button className='button' variant='text'>
                            <ArrowBackIosIcon/>
                            Вернуться
                        </Button>
                    </NavLink>
                    <Button disabled={isLoading || arts.length <= 0} variant="contained"
                        // onClick={() => submit()}
                    >
                        Оплатить
                    </Button>
                </div>
            </Container>

        </React.Fragment>
    );
};

export default Cart;