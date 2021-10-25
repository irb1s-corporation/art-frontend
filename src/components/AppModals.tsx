import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "./Modals/Login";
import Reg from "./Modals/Reg";

const AppModals = () => {
    const {LoginModal, RegModal} = useTypedSelector(state => state.modals)
    return (
        <React.Fragment>
            <Login open={LoginModal}/>
            <Reg open={RegModal}/>
        </React.Fragment>
    );
};

export default AppModals;