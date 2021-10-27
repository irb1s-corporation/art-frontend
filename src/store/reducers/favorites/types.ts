import {IPosts} from "../../../models/IPosts";

export interface FavoritesState {
    favoriteArts: IPosts[],
}

export enum FavoritesActionEnum {
    ADD_ART_FAVORITE = 'ADD_ART_FAVORITE',
    DELETE_ART_FAVORITE = 'DELETE_ART_FAVORITE',
    DELETE_ALL_ARTS_FAVORITE = 'DELETE_ALL_ARTS_'
}

export interface AddArtFavorite {
    type: FavoritesActionEnum.ADD_ART_FAVORITE,
    payload: IPosts,
}

export interface DeleteArtFavorite {
    type: FavoritesActionEnum.DELETE_ART_FAVORITE,
    payload: number,
}

export interface DeleteAllArtFavorite {
    type: FavoritesActionEnum.DELETE_ALL_ARTS_FAVORITE,
}

export type FavoritesAction = AddArtFavorite | DeleteArtFavorite | DeleteAllArtFavorite