import {IPosts} from "../../../models/IPosts";
import {CartAddArt, CartActionEnum, CartDeleteArt, CartDeleteAllArt} from "./types";

export const CartActionCreators = {
    addArt: (art: IPosts): CartAddArt => ({type: CartActionEnum.CART_ADD_ART, payload: art}),
    deleteArt: (id: number): CartDeleteArt => ({type: CartActionEnum.CART_DELETE_ART, payload: id}),
    deleteAllArt: (): CartDeleteAllArt => ({type: CartActionEnum.CART_DELETE_ALL_ARTS})
}