import {IPosts} from "../../../models/IPosts";
import {AppDispatch} from "../../index";
import {FavoriteAddArt, FavoritesActionEnum} from "./types";
import {AuthActionCreators} from "../auth/action-creators";
import LikeService from "../../../api/LikeService";
import {PostActionCreators} from "../posts/action-creators";

export const FavoritesActionCreators = {
    FavoriteAddArt: (art: IPosts): FavoriteAddArt => ({type: FavoritesActionEnum.FAVORITE_ADD_ART, payload: art}),

    // FavoriteDeleteArt: (id: number): FavoriteDeleteArt => ({
    //     type: FavoritesActionEnum.FAVORITE_DELETE_ART,
    //     payload: id
    // }),
    // FavoriteDeleteAllArt: (): FavoriteDeleteAllArt => ({type: FavoritesActionEnum.FAVORITE_DELETE_ALL_ARTS})

    FavoriteCreate: (artId: number, token: string) => async (dispatch: AppDispatch) => {
        try {
            await LikeService.like(artId, token)
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    }
}