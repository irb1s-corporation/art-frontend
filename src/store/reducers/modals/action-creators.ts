import {ModalsActionEnum, setLoginModalAction, setRegModalAction} from "./types";

export const ModalActionCreators =
    {
        setLoginModal: (open: boolean): setLoginModalAction => ({
            type: ModalsActionEnum.SET_LOGIN_MODAL,
            payload: open
        }),
        setRegModal: (open: boolean): setRegModalAction => ({type: ModalsActionEnum.SET_REG_MODAL, payload: open}),
    }