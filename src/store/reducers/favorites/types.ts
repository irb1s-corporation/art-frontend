import {IPosts} from "../../../models/IPosts";

export interface FavoritesState {
    favoriteArts: IPosts[],
    FavoriteIsLoading: boolean;
}

export enum FavoritesActionEnum {
    FAVORITE_GET_ARTS = ' FAVORITE_GET_ARTS',
    FAVORITE_ADD_ART = 'ADD_ART_FAVORITE',
    FAVORITE_DELETE_ART = 'DELETE_ART_FAVORITE',
    FAVORITE_DELETE_ALL_ARTS = 'DELETE_ALL_ARTS_',
    FAVORITE_SET_IS_LOADING = "FAVORITE_SET_IS_LOADING",
}

export interface FavoriteGetArts {
    type: FavoritesActionEnum.FAVORITE_GET_ARTS,
    payload: IPosts[],
}

export interface FavoriteAddArt {
    type: FavoritesActionEnum.FAVORITE_ADD_ART,
    payload: IPosts,
}

export interface FavoriteDeleteArt {
    type: FavoritesActionEnum.FAVORITE_DELETE_ART,
    payload: number,
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
    | FavoriteAddArt
    | FavoriteDeleteArt
    | FavoriteDeleteAllArt
    | FavoriteSetIsLoading