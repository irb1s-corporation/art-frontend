import {IPosts} from "../../../models/IPosts";

export interface CartState {
    arts: IPosts[],
    price: number,
}

export enum CartActionEnum {
    ADD_ART = 'ADD_ART',
    DELETE_ART = 'DELETE_ART',
    DELETE_ALL_ARTS = 'DELETE_ALL_ARTS'
}

export interface AddArt {
    type: CartActionEnum.ADD_ART,
    payload: IPosts,
}

export interface DeleteArt {
    type: CartActionEnum.DELETE_ART,
    payload: number,
}

export interface DeleteAllArt {
    type: CartActionEnum.DELETE_ALL_ARTS,
}

export type CartAction = AddArt | DeleteArt | DeleteAllArt