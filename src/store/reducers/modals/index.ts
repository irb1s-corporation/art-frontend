import {ModalsAction, ModalsActionEnum, ModalsState} from "./types";

const initialState: ModalsState = {
    LoginModal: false,
    RegModal: false,
    BuyArt: false,
    BuyArtId: 0,
}

export default function modalsReducer(state = initialState, action: ModalsAction): ModalsState {
    switch (action.type) {
        case ModalsActionEnum.SET_LOGIN_MODAL:
            return {...state, LoginModal: action.payload}
        case ModalsActionEnum.SET_REG_MODAL:
            return {...state, RegModal: action.payload}
        case ModalsActionEnum.SET_BUY_ART_MODAL:
            return {...state, BuyArt: action.payload}
        default:
            return state
    }
}