import React from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import Login from "./Modals/Login";
import Reg from "./Modals/Reg";
import ConfirmBuyArt from "./Modals/ConfirmBuyArt";

const AppModals = () => {
    const {LoginModal, RegModal, BuyArt} = useTypedSelector(state => state.modals)
    return (
        <React.Fragment>
            <Login open={LoginModal}/>
            <Reg open={RegModal}/>
            <ConfirmBuyArt open={BuyArt}/>
        </React.Fragment>
    );
};

export default AppModals;