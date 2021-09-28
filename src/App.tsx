import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";
import {ThemeProvider} from "@emotion/react";
import {Container, CssBaseline} from "@mui/material";

const App = () => {
    return (
        <Container maxWidth="sm">
            <CssBaseline/>
            <Header/>
            <AppRouter/>
        </Container>
    );
};

export default App;