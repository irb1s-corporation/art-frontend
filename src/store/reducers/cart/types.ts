import {IPosts} from "../../../models/IPosts";

export interface CartState {
    arts: IPosts[],
    price: 0,
}

export enum CartActionEnum {
    ADD_ART = 'ADD_ART',
    DELETE_ART = 'DELETE_ART',
}

export interface AddArt {
    type: CartActionEnum.ADD_ART,
    payload: IPosts,
}

export interface DeleteArt {
    type: CartActionEnum.DELETE_ART,
    payload: IPosts,
}

export type CartAction = AddArt | DeleteArt