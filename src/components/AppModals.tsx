import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "./modals/Login";
import Reg from "./modals/Reg";

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