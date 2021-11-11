import {IPosts} from "../../../models/IPosts";
import {CartAddArt, CartActionEnum, CartDeleteAllArt} from "./types";

export const CartActionCreators = {
    CartAddArt: (id: number): CartAddArt => ({type: CartActionEnum.CART_ADD_ART, payload: id}),
    CartDeleteAllArt: (): CartDeleteAllArt => ({type: CartActionEnum.CART_DELETE_ALL_ARTS})
}