import {IPosts} from "../../../models/IPosts";
import {CartAddArt, CartActionEnum, CartDeleteArt, CartDeleteAllArt} from "./types";

export const CartActionCreators = {
    CartAddArt: (art: IPosts): CartAddArt => ({type: CartActionEnum.CART_ADD_ART, payload: art}),
    CartDeleteArt: (id: number): CartDeleteArt => ({type: CartActionEnum.CART_DELETE_ART, payload: id}),
    CartDeleteAllArt: (): CartDeleteAllArt => ({type: CartActionEnum.CART_DELETE_ALL_ARTS})
}