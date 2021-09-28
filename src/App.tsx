import React from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline} from "@mui/material";

const theme = createTheme();
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppRouter/>
        </ThemeProvider>
    );
};

export default App;