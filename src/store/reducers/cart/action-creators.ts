import {IPosts} from "../../../models/IPosts";
import {AddArt, CartActionEnum, DeleteAllArt, DeleteArt} from "./types";

export const CartActionCreators = {
    addArt: (art: IPosts): AddArt => ({type: CartActionEnum.ADD_ART, payload: art}),
    deleteArt: (id: number): DeleteArt => ({type: CartActionEnum.DELETE_ART, payload: id}),
    deleteAllArt: (): DeleteAllArt => ({type: CartActionEnum.DELETE_ALL_ARTS})
}