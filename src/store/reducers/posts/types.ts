import {IPosts} from "../../../models/IPosts";

export interface PostsState {
    initialPosts: IPosts[],
    filterPosts: IPosts[],
    find: IPosts[],
    isLoadingPosts: boolean,
}

export enum PostsActionEnum {
    SET_POSTS = 'SET_POPULAR_POSTS',
    SET_FIND_POSTS = 'SET_FIND_POSTS',
    SET_IS_LOADING_POSTS = 'SET_IS_LOADING_POSTS',
    FILTER_PRICE_POSTS = 'FILTER_PRICE_POSTS',
    SORT_BY_NEW_POSTS = 'SORT_BY_NEW_POSTS',
    SORT_BY_OLD_POSTS = 'SORT_BY_OLD_POSTS',
    SORT_BY_HIGH_PRICE = 'SORT_BY_HIGH_PRICE',
    SORT_BY_LOW_PRICE = 'SORT_BY_LOW_PRICE',
    SORT_BY_POPULAR = 'SORT_BY_POPULAR',
}

export interface setPosts {
    type: PostsActionEnum.SET_POSTS
    payload: IPosts[]
}


export interface setFindPosts {
    type: PostsActionEnum.SET_FIND_POSTS
    payload: IPosts[]
}

export interface filterPricePosts {
    type: PostsActionEnum.FILTER_PRICE_POSTS,
    minPrice: number,
    maxPrice: number,
}

export interface setIsLoadingPosts {
    type: PostsActionEnum.SET_IS_LOADING_POSTS,
    payload: boolean
}

export interface sortByNewPosts {
    type: PostsActionEnum.SORT_BY_NEW_POSTS
}

export interface sortByOldPosts {
    type: PostsActionEnum.SORT_BY_OLD_POSTS
}

export interface sortByHighPrice {
    type: PostsActionEnum.SORT_BY_HIGH_PRICE
}

export interface sortByLowPrice {
    type: PostsActionEnum.SORT_BY_LOW_PRICE
}

export interface sortByPopular {
    type: PostsActionEnum.SORT_BY_POPULAR
}

export type PostsAction =
    setPosts
    | setFindPosts
    | filterPricePosts
    | sortByNewPosts
    | sortByOldPosts
    | sortByHighPrice
    | sortByLowPrice
    | sortByPopular
    | setIsLoadingPosts