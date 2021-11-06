import {PostsAction, PostsActionEnum, PostsState} from "./types";
import {IPosts} from "../../../models/IPosts";

const initialState: PostsState = {
    popular: [] as IPosts[],
}

export default function postsReducer(state = initialState, action: PostsAction) {
    switch (action.type) {
        case PostsActionEnum.SET_POPULAR_POSTS:
            return {...state, popular: action.payload}
        case PostsActionEnum.SET_RENDER_POST:
            initialState.popular[initialState.popular.findIndex((art: IPosts) => art.id === action.payload.id)] = action.payload
            return {...state}
        default:
            return state
    }
}
