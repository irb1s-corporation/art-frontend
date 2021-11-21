import {IPosts} from "../../../models/IPosts";


export interface ProfileState {
    userPosts: IPosts[],
}

export enum ProfileActionEnum {
    SET_USER_POSTS = 'SET_USER_POSTS'
}

export interface SetUserPosts {
    type: ProfileActionEnum.SET_USER_POSTS,
    payload: IPosts[]
}

export type ProfileAction = SetUserPosts