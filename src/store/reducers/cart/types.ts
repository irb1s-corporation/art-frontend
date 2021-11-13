import {IPosts} from "../../../models/IPosts";

export interface cartPost {
    post: IPosts
}

export interface CartState {
    cartArts: cartPost[],
    cartPrice: number,
    cartIsLoading: boolean,
}

export enum CartActionEnum {
    CART_SET_IS_LOADING = 'CART_SET_IS_LOADING',
    CART_GET_ARTS = 'CART_GET_ARTS',
    CART_DELETE_ALL_ARTS = 'DELETE_ALL_ARTS',
}

export interface CartSetIsLoading {
    type: CartActionEnum.CART_SET_IS_LOADING,
    payload: boolean,
}

export interface CartGetArts {
    type: CartActionEnum.CART_GET_ARTS,
    payload: cartPost[],
}

export interface CartDeleteAllArt {
    type: CartActionEnum.CART_DELETE_ALL_ARTS,
}

export type CartAction = CartSetIsLoading | CartDeleteAllArt | CartGetArts