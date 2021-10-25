import {IPosts} from "../../../models/IPosts";
import {AddArt, CartActionEnum} from "./types";

export const CartActionCreators = {
    addArt: (art: IPosts): AddArt => ({type: CartActionEnum.ADD_ART, payload: art})

}