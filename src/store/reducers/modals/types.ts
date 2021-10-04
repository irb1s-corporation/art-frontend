export interface ModalsState {
    LoginModal: boolean,
    RegModal: boolean,
}

export enum ModalsActionEnum {
    SET_LOGIN_MODAL = 'SET_LOGIN_MODAL',
    SET_REG_MODAL = 'SET_REG_MODAL',
}

export interface setLoginModalAction {
    type: ModalsActionEnum.SET_LOGIN_MODAL;
    payload: boolean,
}

export interface setRegModalAction {
    type: ModalsActionEnum.SET_REG_MODAL;
    payload: boolean,
}

export type ModalsAction = setLoginModalAction | setRegModalAction