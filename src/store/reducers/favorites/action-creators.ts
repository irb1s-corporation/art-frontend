import {IPosts} from "../../../models/IPosts";
import {AppDispatch} from "../../index";
import {FavoriteGetArts, FavoritesActionEnum} from "./types";
import {AuthActionCreators} from "../auth/action-creators";
import LikeService from "../../../api/LikeService";
import PostService from "../../../api/PostService";

export const FavoritesActionCreators = {
    FavoriteGetArts: (arts: IPosts[]): FavoriteGetArts => ({
        type: FavoritesActionEnum.FAVORITE_GET_ARTS,
        payload: arts
    }),

    FavoriteCreate: (artId: number, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            await LikeService.like(artId, token)
            FavoritesActionCreators.FavoriteGet(token)
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },
    FavoriteGet: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const res = await PostService.getLikes(token)
            if (res.data) {
                dispatch(FavoritesActionCreators.FavoriteGetArts(res.data))
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false))
        }
    }
}