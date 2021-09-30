import React from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Menu from "./components/Menu/Menu";
import {CssBaseline} from "@mui/material";

const App = () => {
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppRouter/>
        </React.Fragment>
    );
};

export default App;