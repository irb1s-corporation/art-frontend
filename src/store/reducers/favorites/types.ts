import {IPosts} from "../../../models/IPosts";

export interface favoritesPost {
    post: IPosts
}

export interface FavoritesState {
    favoriteArts: favoritesPost[],
    FavoriteIsLoading: boolean;
}

export enum FavoritesActionEnum {
    FAVORITE_GET_ARTS = ' FAVORITE_GET_ARTS',
    FAVORITE_DELETE_ALL_ARTS = 'DELETE_ALL_ARTS_',
    FAVORITE_SET_IS_LOADING = "FAVORITE_SET_IS_LOADING",
}

export interface FavoriteGetArts {
    type: FavoritesActionEnum.FAVORITE_GET_ARTS,
    payload: favoritesPost[],
}

export interface FavoriteDeleteAllArt {
    type: FavoritesActionEnum.FAVORITE_DELETE_ALL_ARTS,
}

export interface FavoriteSetIsLoading {
    type: FavoritesActionEnum.FAVORITE_SET_IS_LOADING,
    payload: boolean
}

export type FavoritesAction =
    FavoriteGetArts
    | FavoriteDeleteAllArt
    | FavoriteSetIsLoading