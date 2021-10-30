import {IPosts} from "../../../models/IPosts";
import {FavoriteAddArt, FavoriteDeleteArt, FavoriteDeleteAllArt, FavoritesActionEnum} from "./types";

export const FavoritesActionCreators = {
    FavoriteAddArt: (art: IPosts): FavoriteAddArt => ({type: FavoritesActionEnum.FAVORITE_ADD_ART, payload: art}),
    FavoriteDeleteArt: (id: number): FavoriteDeleteArt => ({
        type: FavoritesActionEnum.FAVORITE_DELETE_ART,
        payload: id
    }),
    FavoriteDeleteAllArt: (): FavoriteDeleteAllArt => ({type: FavoritesActionEnum.FAVORITE_DELETE_ALL_ARTS})
}