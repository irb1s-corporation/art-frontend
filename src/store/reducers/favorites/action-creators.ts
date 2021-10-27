import {IPosts} from "../../../models/IPosts";
import {AddArtFavorite,DeleteArtFavorite,DeleteAllArtFavorite, FavoritesActionEnum} from "./types";

export const FavoritesActionCreators = {
    addArtFavorite: (art: IPosts): AddArtFavorite => ({type: FavoritesActionEnum.ADD_ART_FAVORITE, payload: art}),
    deleteArtFavorite: (id: number): DeleteArtFavorite => ({type: FavoritesActionEnum.DELETE_ART_FAVORITE, payload: id}),
    deleteAllArtFavorite: (): DeleteAllArtFavorite => ({type: FavoritesActionEnum.DELETE_ALL_ARTS_FAVORITE})
}