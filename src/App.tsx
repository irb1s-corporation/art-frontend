import React, {useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";
import AppModals from "./components/AppModals";
import {useActions} from "./hooks/useActions";

const App = () => {
    const {setUser, setIsAuth} = useActions()
    useEffect(() => {
        const token = localStorage.getItem('token');
        const auth = localStorage.getItem('auth');
        if (auth && token) {
            // setUser({user_name: localStorage.getItem('user')} as IUser)
            setIsAuth(true, token)
        }
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppModals/>
            <AppRouter/>
        </ThemeProvider>
    );
};

export default App;