import {IPosts} from "../../../models/IPosts";

export interface PostsState {
    initialPosts: IPosts[],
    filterPosts: IPosts[],
    find: IPosts[],
}

export enum PostsActionEnum {
    SET_POSTS = 'SET_POPULAR_POSTS',
    SET_FIND_POSTS = 'SET_FIND_POSTS',
    FILTER_PRICE_POSTS = 'FILTER_PRICE_POSTS'
}

export interface setPosts {
    type: PostsActionEnum.SET_POSTS
    payload: IPosts[]
}

export interface filterPricePosts {
    type: PostsActionEnum.FILTER_PRICE_POSTS,
    minPrice: number,
    maxPrice: number,
}

export interface setFindPosts {
    type: PostsActionEnum.SET_FIND_POSTS
    payload: IPosts[]
}

export type PostsAction = setPosts | setFindPosts | filterPricePosts