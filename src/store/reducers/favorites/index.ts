import {FavoritesAction, FavoritesActionEnum, FavoritesState} from "./types";

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
        case FavoritesActionEnum.FAVORITE_DELETE_ALL_ARTS:
            initialState.favoriteArts.splice(0, initialState.favoriteArts.length)
            return {...state,}
        default:
            return state;
    }
}