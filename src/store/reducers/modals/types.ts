export interface ModalsState {
    LoginModal: boolean,
    RegModal: boolean,
    BuyArt: boolean,
    BuyArtId: number,
}

export enum ModalsActionEnum {
    SET_LOGIN_MODAL = 'SET_LOGIN_MODAL',
    SET_REG_MODAL = 'SET_REG_MODAL',
    SET_BUY_ART_MODAL = 'SET_BUY_ART_MODAL',
}

export interface setLoginModalAction {
    type: ModalsActionEnum.SET_LOGIN_MODAL;
    payload: boolean,
}

export interface setRegModalAction {
    type: ModalsActionEnum.SET_REG_MODAL;
    payload: boolean,
}

export interface setBuyArtModal {
    type: ModalsActionEnum.SET_BUY_ART_MODAL
    postId: number,
    payload: boolean
}

export type ModalsAction = setLoginModalAction | setRegModalAction | setBuyArtModal