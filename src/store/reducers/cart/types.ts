import {IPosts} from "../../../models/IPosts";

export interface CartState {
    cartArts: IPosts[],
    cartPrice: number,
}

export enum CartActionEnum {
    CART_SET_IS_LOADING = 'CART_SET_IS_LOADING',
    CART_ADD_ART = 'ADD_ART',
    CART_GET_ARTS = 'CART_GET_ARTS',
    CART_DELETE_ALL_ARTS = 'DELETE_ALL_ARTS'
}

export interface CartAddArt {
    type: CartActionEnum.CART_ADD_ART,
    payload: number,
}

export interface CartSetIsLoading {
    type: CartActionEnum.CART_SET_IS_LOADING,
    payload: boolean,
}

export interface CartGetArts {
    type: CartActionEnum.CART_GET_ARTS,
    payload: IPosts[],
}

export interface CartDeleteAllArt {
    type: CartActionEnum.CART_DELETE_ALL_ARTS,
}

export type CartAction = CartAddArt | CartSetIsLoading | CartDeleteAllArt | CartGetArts