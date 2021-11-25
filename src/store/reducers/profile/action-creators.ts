import {AppDispatch} from "../../index";
import ProfileService from "../../../api/ProfileService";
import {AuthActionCreators} from "../auth/action-creators";
import {ProfileActionEnum, SetUserPosts} from "./types";
import {IPosts} from "../../../models/IPosts";

export const ProfileActionCreators = {
    setUserPosts: (posts: IPosts[]): SetUserPosts => ({type: ProfileActionEnum.SET_USER_POSTS, payload: posts}),

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
            dispatch(AuthActionCreators.setUser(res.data.user))
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка ' + e));
        }
    }
}
