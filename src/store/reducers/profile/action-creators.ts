import {AppDispatch} from "../../index";
import ProfileService from "../../../api/ProfileService";
import {AuthActionCreators} from "../auth/action-creators";
import {
    collectionPost,
    ProfileActionEnum,
    SetIsLoadingProfile,
    SetUserCollection,
    SetUserCollectionForGuest,
    SetUserForGuest,
    SetUserPosts,
    SetUserPostsForGuest
} from "./types";
import {IPosts} from "../../../models/IPosts";
import {IUser} from "../../../models/IUser";

export const ProfileActionCreators = {
    setUserPosts: (posts: IPosts[]): SetUserPosts => ({type: ProfileActionEnum.SET_USER_POSTS, payload: posts}),

    setIsLoadingProfile: (payload: boolean): SetIsLoadingProfile => ({
        type: ProfileActionEnum.SET_IS_LOADING_PROFILE,
        payload: payload
    }),

    setUserCollection: (posts: collectionPost[]): SetUserCollection => ({
        type: ProfileActionEnum.SET_USER_COLLECTION,
        payload: posts
    }),

    //guest
    setUserForGuest: (user: IUser): SetUserForGuest => ({type: ProfileActionEnum.SET_USER_FOR_GUEST, payload: user}),

    setUserPostsForGuest: (posts: IPosts[]): SetUserPostsForGuest => ({
        type: ProfileActionEnum.SET_USER_POSTS_FOR_GUEST,
        payload: posts
    }),
    setUserCollectionForGuest: (posts: collectionPost[]): SetUserCollectionForGuest => ({
        type: ProfileActionEnum.SET_USER_COLLECTION_FOR_GUEST,
        payload: posts
    }),


    getUserPosts: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const res = await ProfileService.getUserPosts(token)
            if (res.data) {
                dispatch(ProfileActionCreators.setUserPosts(res.data))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },

    saveInfo: (token: string, name: string, surname: string, about: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const res = await ProfileService.submitInfo(token, name, surname, about);
            dispatch(AuthActionCreators.setUser(res.data.user))
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка ' + e));
        }
    },
    saveAvatar: (token: string, file: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const res = await ProfileService.submitAvatar(token, file);
            dispatch(AuthActionCreators.setUser(res.data))
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            console.log('Произошла ошибка');
        }
    },
    saveBanner: (token: string, file: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const res = await ProfileService.submitBanner(token, file);
            dispatch(AuthActionCreators.setUser(res.data))
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка ' + e));
        }
    },
    getUserInfoForGuest: (nickname: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ProfileActionCreators.setIsLoadingProfile(true))
            const res = await ProfileService.getUserInfoForGuest(nickname);
            if (res) {
                dispatch(ProfileActionCreators.setUserForGuest(res.data))
                const responsePosts = await ProfileService.getUserPostsForGuest(res.data.id);
                if (responsePosts) {
                    dispatch(ProfileActionCreators.setUserPostsForGuest(responsePosts.data))
                }
                const responseCollection = await ProfileService.getCollection(res.data.id);
                if (responseCollection) {
                    dispatch(ProfileActionCreators.setUserCollectionForGuest(responseCollection.data))
                }

            }
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        } catch (e) {
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        }
    },
    getUserPostsForGuest: (userId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ProfileActionCreators.setIsLoadingProfile(true))
            const res = await ProfileService.getUserPostsForGuest(userId);
            if (res) {
                dispatch(ProfileActionCreators.setUserPostsForGuest(res.data))
            }
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        } catch (e) {
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        }
    },
    getUserCollection: (userId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ProfileActionCreators.setIsLoadingProfile(true))
            const res = await ProfileService.getCollection(userId);
            if (res) {
                dispatch(ProfileActionCreators.setUserCollection(res.data))
            }
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        } catch (e) {
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        }
    },
    getUserCollectionForGuest: (userId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ProfileActionCreators.setIsLoadingProfile(true))
            const res = await ProfileService.getCollection(userId);
            if (res) {
                dispatch(ProfileActionCreators.setUserCollectionForGuest(res.data))
            }
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        } catch (e) {
            dispatch(ProfileActionCreators.setIsLoadingProfile(false))
        }
    }

}
