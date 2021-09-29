import React from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import './Menu.scss';
import {Typography} from "@mui/material";

const Menu = () => {
    return (
        <div className='OutWrapper'>
            <div className='Menu'>
                <div className='MenuWrapper'>
                    <div className='Menu__logo'>
                        <BrushIcon/>
                        <Typography variant='h6'>Art Shop</Typography>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;