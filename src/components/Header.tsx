import React, {FC, useState} from 'react';
import {AppBar, Button, Link, Toolbar, Typography} from "@mui/material";
import BrushIcon from '@mui/icons-material/Brush';

const Header: FC = () => {
    const [isAuth, SetIsAuth] = useState(false);
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <BrushIcon/>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    ArtShop
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Features
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Enterprise
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </Link>
                </nav>
                <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;