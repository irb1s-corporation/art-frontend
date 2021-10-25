import {IPosts} from "../../../models/IPosts";

export interface PostsState {
    popular: IPosts[],
}

export enum PostsActionEnum {
    SET_POPULAR_POSTS = 'SET_POPULAR_POSTS'
}

export interface setPopularPosts {
    type: PostsActionEnum.SET_POPULAR_POSTS
    payload: IPosts[]
}

export type PostsAction = setPopularPosts