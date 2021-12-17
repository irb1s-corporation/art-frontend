import {ModalsActionEnum, setBuyArtModal, setLoginModalAction, setRegModalAction} from "./types";

export const ModalActionCreators =
    {
        setLoginModal: (open: boolean): setLoginModalAction => ({
            type: ModalsActionEnum.SET_LOGIN_MODAL,
            payload: open
        }),
        setRegModal: (open: boolean): setRegModalAction => ({type: ModalsActionEnum.SET_REG_MODAL, payload: open}),
        setBuyArtModal: (open: boolean, id: number): setBuyArtModal => ({
            type: ModalsActionEnum.SET_BUY_ART_MODAL,
            payload: open,
            postId: id
        }),
    }