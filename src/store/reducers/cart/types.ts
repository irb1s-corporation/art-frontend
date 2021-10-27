import {IPosts} from "../../../models/IPosts";

export interface CartState {
    cartArts: IPosts[],
    cartPrice: number,
}

export enum CartActionEnum {
    CART_ADD_ART = 'ADD_ART',
    CART_DELETE_ART = 'DELETE_ART',
    CART_DELETE_ALL_ARTS = 'DELETE_ALL_ARTS'
}

export interface CartAddArt {
    type: CartActionEnum.CART_ADD_ART,
    payload: IPosts,
}

export interface CartDeleteArt {
    type: CartActionEnum.CART_DELETE_ART,
    payload: number,
}

export interface CartDeleteAllArt {
    type: CartActionEnum.CART_DELETE_ALL_ARTS,
}

export type CartAction = CartAddArt | CartDeleteArt | CartDeleteAllArt