import {PostsAction, PostsActionEnum, PostsState} from "./types";

const initialState: PostsState = {
    initialPosts: [],
    filterPosts: [],
    find: [],
}

export default function postsReducer(state = initialState, action: PostsAction) {
    switch (action.type) {
        case PostsActionEnum.SET_POSTS:
            return {...state, filterPosts: action.payload, initialPosts: action.payload}
        case PostsActionEnum.FILTER_PRICE_POSTS:
            console.log('filter')
            if (action.maxPrice > 0 && action.minPrice > 0) {
                return {
                    ...state,
                    filterPosts: state.initialPosts.filter((post) => post.price >= action.minPrice && action.maxPrice && post.price <= action.maxPrice)
                }
            } else if (action.minPrice > 0) {
                return {
                    ...state,
                    filterPosts: state.initialPosts.filter((post) => post.price >= action.minPrice)
                }
            } else if (action.maxPrice >  0) {
                return {
                    ...state,
                    filterPosts: state.initialPosts.filter((post) => post.price <= action.maxPrice)
                }
            }
            return {...state, filterPosts: state.initialPosts}
        case PostsActionEnum.SET_FIND_POSTS:
            return {...state, find: action.payload}
        default:
            return state
    }
}
