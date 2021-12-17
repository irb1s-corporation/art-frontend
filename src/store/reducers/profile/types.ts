import {IPosts} from "../../../models/IPosts";
import {IUser} from "../../../models/IUser";

export interface collectionPost {
    post: IPosts
}


export interface ProfileState {
    userPosts: IPosts[],
    userCollection: collectionPost[],
    userForGuest: IUser,
    userPostsForGuest: IPosts[],
    userCollectionForGuest: collectionPost[],
    isLoadingProfile: boolean,
}

export enum ProfileActionEnum {
    SET_USER_POSTS = 'SET_USER_POSTS',
    SET_USER_FOR_GUEST = 'SET_USER_FOR_GUEST',
    SET_USER_POSTS_FOR_GUEST = 'SET_USER_POSTS_FOR_GUEST',
    SET_IS_LOADING_PROFILE = 'SET_IS_LOADING_PROFILE',
    SET_USER_COLLECTION = 'SET_USER_COLLECTION',
    SET_USER_COLLECTION_FOR_GUEST = 'SET_USER_COLLECTION_FOR_GUEST',
}

export interface SetUserPosts {
    type: ProfileActionEnum.SET_USER_POSTS,
    payload: IPosts[]
}

export interface SetUserForGuest {
    type: ProfileActionEnum.SET_USER_FOR_GUEST,
    payload: IUser,
}

export interface SetUserPostsForGuest {
    type: ProfileActionEnum.SET_USER_POSTS_FOR_GUEST,
    payload: IPosts[],
}

export interface SetIsLoadingProfile {
    type: ProfileActionEnum.SET_IS_LOADING_PROFILE,
    payload: boolean
}

export interface SetUserCollection {
    type: ProfileActionEnum.SET_USER_COLLECTION,
    payload: collectionPost[]
}

export interface SetUserCollectionForGuest {
    type: ProfileActionEnum.SET_USER_COLLECTION_FOR_GUEST
    payload: collectionPost[]
}

export type ProfileAction =
    SetUserPosts
    | SetUserForGuest
    | SetUserPostsForGuest
    | SetIsLoadingProfile
    | SetUserCollection
    | SetUserCollectionForGuest