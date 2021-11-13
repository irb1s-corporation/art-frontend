import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";
import AppModals from "./components/AppModals";
import {useActions} from "./hooks/useActions";
import './App.css';
import Header from "./components/Header/Header";

const App = () => {
    const {ref, setIsAuth, GetCart, FavoriteGet} = useActions()
    useEffect(() => {
        const token = localStorage.getItem('token');
        const auth = localStorage.getItem('auth');
        if (auth && token) {
            ref(token)
            GetCart(token)
            FavoriteGet(token)
        } else {
            setIsAuth(false, '')
        }
    }, [ref, setIsAuth, GetCart,FavoriteGet])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppModals/>
            <Header/>
            <AppRouter/>
        </ThemeProvider>
    );
};

export default App;