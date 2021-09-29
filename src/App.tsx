import React from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Menu from "./components/Menu/Menu";

const App = () => {
    return (
        <React.Fragment>
            <AppRouter/>
        </React.Fragment>
    );
};

export default App;