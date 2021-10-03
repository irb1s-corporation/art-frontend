import React from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppRouter/>
        </ThemeProvider>
    );
};

export default App;