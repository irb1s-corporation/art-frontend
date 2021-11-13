import {AppDispatch} from "../../index";
import {
    FavoriteGetArts,
    FavoritesActionEnum,
    FavoriteSetIsLoading,
    favoritesPost
} from "./types";
import PostService from "../../../api/PostService";

export const FavoritesActionCreators = {
    FavoriteGetArts: (arts: favoritesPost[]): FavoriteGetArts => ({
        type: FavoritesActionEnum.FAVORITE_GET_ARTS,
        payload: arts
    }),

    FavoriteSetIsLoading: (payload: boolean): FavoriteSetIsLoading => ({
        type: FavoritesActionEnum.FAVORITE_SET_IS_LOADING,
        payload: payload,
    }),

    FavoriteCreate: (artId: number, token: string) => async (dispatch: AppDispatch) => {
        try {
            await PostService.like(artId, token)
            const res = await PostService.getLikes(token)
            if (res.data) {
                dispatch(FavoritesActionCreators.FavoriteGetArts(res.data))
            }
        } catch (e) {
            dispatch(FavoritesActionCreators.FavoriteSetIsLoading(false))
        }
    },

    FavoriteGet: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(FavoritesActionCreators.FavoriteSetIsLoading(true))
            const res = await PostService.getLikes(token)
            if (res.data) {
                dispatch(FavoritesActionCreators.FavoriteGetArts(res.data))
            }
            dispatch(FavoritesActionCreators.FavoriteSetIsLoading(false))
        } catch (e) {
            dispatch(FavoritesActionCreators.FavoriteSetIsLoading(false))
        }
    }
}