import React, {useEffect, Suspense} from 'react';
import AppRouter from "./components/AppRouter";
import {Box, CssBaseline, LinearProgress, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";
import {useActions} from "./hooks/useActions";
import Header from "./components/Header/Header";
import './App.css';

const AppModals = React.lazy(() => import('./components/AppModals'))
const Snackbars = React.lazy(() => import('./components/Snackbars'))

const App = () => {
    const {ref, setIsAuth, GetCart, FavoriteGet, getPosts} = useActions()
    useEffect(() => {
        const token = localStorage.getItem('token');
        const auth = localStorage.getItem('auth');
        getPosts()
        if (auth && token) {
            ref(token)
            GetCart(token)
            // FavoriteGet(token)
        } else {
            setIsAuth(false, '')
        }
    }, [ref, setIsAuth, GetCart, FavoriteGet, getPosts])
    console.log('app')
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Suspense fallback={
                <Box sx={{width: '100%'}}>
                    <LinearProgress/>
                </Box>
            }>
                <Snackbars/>
                <AppModals/>
            </Suspense>
            <Header/>
            <AppRouter/>
        </ThemeProvider>
    );
};

export default App;