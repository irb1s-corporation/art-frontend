import React, {FC} from 'react';
import {Button, Container, Typography} from "@mui/material";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IPosts} from "../models/IPosts";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {NavLink} from "react-router-dom";

const Cart: FC = () => {
    const {arts, price} = useTypedSelector(state => state.cart)
    const {isLoading} = useTypedSelector(state => state.auth);

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className="Cart__header">
                    <div className='title'>

                        <Typography variant="h4">
                            Корзина
                        </Typography>
                    </div>
                    <div className='clear'>
                        <DeleteIcon/>
                        <Typography variant="h6">
                            Очистить корзину
                        </Typography>
                    </div>
                </div>
                <div className="hr"/>
                <div className='Cart__arts'>
                    {arts.map((post: IPosts, index) =>
                        <div className='art' key={post.id + "_" + index}>
                            {post.title}
                        </div>
                    )}
                    <Typography variant={'h5'}>Итого: {price}руб.</Typography>
                </div>
                <div className="hr"/>
                <div className='Cart__footer'>
                    <NavLink to={'/'}>
                        <Button className='button' variant='text'>
                            <ArrowBackIosIcon/>
                            Вернуться
                        </Button>
                    </NavLink>
                    <Button disabled={isLoading} variant="contained"
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