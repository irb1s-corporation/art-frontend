import {IPosts} from "../../../models/IPosts";

export interface PostsState {
    popular: IPosts[],
    find: IPosts[],

}

export enum PostsActionEnum {
    SET_POPULAR_POSTS = 'SET_POPULAR_POSTS',
    SET_FIND_POSTS = 'SET_FIND_POSTS'
}

export interface setPopularPosts {
    type: PostsActionEnum.SET_POPULAR_POSTS
    payload: IPosts[]
}

export interface setFindPosts {
    type: PostsActionEnum.SET_FIND_POSTS
    payload: IPosts[]
}

export type PostsAction = setPopularPosts | setFindPosts