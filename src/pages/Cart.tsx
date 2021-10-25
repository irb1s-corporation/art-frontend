import React, {FC} from 'react';
import {Container, Typography} from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IPosts} from "../models/IPosts";

const Cart: FC = () => {
    const {arts} = useTypedSelector(state => state.cart)
    return (
        <React.Fragment>
            <Container>
                <div className="PageTitle">
                    <Typography variant="h4">
                        Корзина <ShoppingBasketIcon/>
                    </Typography>
                    <div className="hr"/>
                </div>
                {arts.map((post: IPosts) =>
                    <div>
                        {post.title}
                    </div>
                )}
                <div className="hr"/>
                <div className='Cart__checkout'>
                    <Typography variant={'h5'}>Итого:</Typography>
                </div>
            </Container>

        </React.Fragment>
    );
};

export default Cart;