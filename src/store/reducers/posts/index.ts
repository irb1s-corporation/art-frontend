import {PostsAction, PostsActionEnum, PostsState} from "./types";
import {IPosts} from "../../../models/IPosts";

const initialState: PostsState = {
    popular: [] as IPosts[],
}

export default function postsReducer(state = initialState, action: PostsAction) {
    switch (action.type) {
        case PostsActionEnum.SET_POPULAR_POSTS:
            return {...state, popular: action.payload}
        default:
            return state
    }
}
