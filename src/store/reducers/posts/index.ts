import {PostsAction, PostsActionEnum, PostsState} from "./types";

const initialState: PostsState = {
    popular: [],
    find: []
}

export default function postsReducer(state = initialState, action: PostsAction) {
    switch (action.type) {
        case PostsActionEnum.SET_POPULAR_POSTS:
            return {...state, popular: action.payload}
        case PostsActionEnum.SET_FIND_POSTS:
            return {...state, find: action.payload}
        default:
            return state
    }
}
