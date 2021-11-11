import {FavoritesAction, FavoritesActionEnum, FavoritesState} from "./types";
import {IPosts} from "../../../models/IPosts";

const initialState: FavoritesState = {
    favoriteArts: [],
    FavoriteIsLoading: false,
}

export default function CartReducer(state = initialState, action: FavoritesAction): FavoritesState {
    switch (action.type) {
        case FavoritesActionEnum.FAVORITE_SET_IS_LOADING:
            return {...state, FavoriteIsLoading: action.payload}
        case FavoritesActionEnum.FAVORITE_GET_ARTS:
            return {...state, favoriteArts: action.payload}
        case FavoritesActionEnum.FAVORITE_ADD_ART:
            initialState.favoriteArts.push(action.payload)
            return {...state}
        case FavoritesActionEnum.FAVORITE_DELETE_ART:
            initialState.favoriteArts.splice(initialState.favoriteArts.findIndex((art: IPosts,) => art.id === action.payload), 1)
            return {...state}
        case FavoritesActionEnum.FAVORITE_DELETE_ALL_ARTS:
            initialState.favoriteArts.splice(0, initialState.favoriteArts.length)
            return {...state,}
        default:
            return state;
    }
}