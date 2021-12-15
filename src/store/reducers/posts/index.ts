import {PostsAction, PostsActionEnum, PostsState} from "./types";

const initialState: PostsState = {
    initialPosts: [],
    filterPosts: [],
    find: [],
    isLoadingPosts: false
}

export default function postsReducer(state = initialState, action: PostsAction) {
    switch (action.type) {
        case PostsActionEnum.SET_POSTS:
            return {...state, filterPosts: action.payload, initialPosts: action.payload}
        case PostsActionEnum.FILTER_PRICE_POSTS:
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
            } else if (action.maxPrice > 0) {
                return {
                    ...state,
                    filterPosts: state.initialPosts.filter((post) => post.price <= action.maxPrice)
                }
            }
            return {...state, filterPosts: state.initialPosts}
        case PostsActionEnum.SORT_BY_NEW_POSTS:
            return {
                ...state, filterPosts: state.initialPosts.sort((a, b) => {
                    if (a.createdAt > b.createdAt) {
                        return -1
                    } else {
                        return +1
                    }
                })
            }
        case PostsActionEnum.SORT_BY_OLD_POSTS:
            return {
                ...state, filterPosts: state.initialPosts.sort((a, b) => {
                    if (a.createdAt < b.createdAt) {
                        return -1
                    } else {
                        return +1
                    }
                })
            }
        case PostsActionEnum.SORT_BY_HIGH_PRICE:
            return {
                ...state, filterPosts: state.initialPosts.sort((a, b) => {
                    if (a.price > b.price) {
                        return -1
                    } else {
                        return +1
                    }
                })
            }
        case PostsActionEnum.SORT_BY_LOW_PRICE:
            return {
                ...state, filterPosts: state.initialPosts.sort((a, b) => {
                    if (a.price < b.price) {
                        return -1
                    } else {
                        return +1
                    }
                })
            }
        case PostsActionEnum.SORT_BY_POPULAR:
            return {
                ...state, filterPosts: state.initialPosts.sort((a, b) => {
                    if (a.views && b.views) {
                        if (a.views.length > b.views.length) {
                            return -1
                        } else {
                            return +1
                        }
                    } else {
                        return -1
                    }
                })
            }
        case PostsActionEnum.SET_FIND_POSTS:
            return {...state, find: action.payload}
        default:
            return state
    }
}
