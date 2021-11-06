import {IPosts} from "../../../models/IPosts";

export interface FavoritesState {
    favoriteArts: IPosts[],
}

export enum FavoritesActionEnum {
    FAVORITE_ADD_ART = 'ADD_ART_FAVORITE',
    FAVORITE_DELETE_ART = 'DELETE_ART_FAVORITE',
    FAVORITE_DELETE_ALL_ARTS = 'DELETE_ALL_ARTS_'
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

export type FavoritesAction = FavoriteAddArt | FavoriteDeleteArt | FavoriteDeleteAllArt