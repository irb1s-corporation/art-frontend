import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import {ModalActionCreators} from "../modals/action-creators";
import {PostActionCreators} from "../posts/action-creators";
import PostService from "../../../api/PostService";
import {FavoritesActionCreators} from "../favorites/action-creators";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean, token: string): SetAuthAction => ({
        type: AuthActionEnum.SET_AUTH,
        payload: auth,
        token: token
    }),
    setIsError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),

    login: (user_email: string, user_password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const res = await UserService.Login(user_email, user_password);
            if (res.data?.token) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('token', res.data.token)
                dispatch(AuthActionCreators.setUser(res.data.user))
                dispatch(ModalActionCreators.setLoginModal(false))
                dispatch(AuthActionCreators.setIsAuth(true, res.data.token))
            } else if (res.data?.message) {
                dispatch(AuthActionCreators.setIsError(res.data.message));
            } else {
                dispatch(AuthActionCreators.setIsError('Произошла ошибка'));
            }
        } catch (error) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка' + error));
        }
    },

    reg: (user_nickname: string, user_email: string, user_password: string) => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.Reg(user_nickname, user_email, user_password);
            console.log(response)
            if (response.data.token) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('token', response.data.token)
                dispatch(AuthActionCreators.setUser(response.data.user))
                dispatch(AuthActionCreators.setIsAuth(true, response.data.token))
                dispatch(ModalActionCreators.setRegModal(false))
            } else if (response.data[0]) {
                dispatch(AuthActionCreators.setIsError(response.data[0]));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка'));
        }
    },

    ref: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const token = localStorage.getItem('token');
            const responsePosts = await PostService.getPopular()
            if (responsePosts) {
                dispatch(PostActionCreators.setPosts(responsePosts.data))
            }
            if (token) {
                const response = await UserService.Ref(token);
                if (response.status === 200) {
                    dispatch(AuthActionCreators.setUser(response.data.user))
                    dispatch(AuthActionCreators.setIsAuth(true, response.data.token))
                    const responseFavorite = await PostService.getLikes(token)
                    if (responseFavorite) {
                        dispatch(FavoritesActionCreators.FavoriteGetArts(responseFavorite.data))
                    }
                } else {
                    dispatch(AuthActionCreators.setUser({} as IUser))
                    dispatch(AuthActionCreators.setIsAuth(false, ''))
                }
            } else {
                dispatch(AuthActionCreators.setUser({} as IUser))
                dispatch(AuthActionCreators.setIsAuth(false, ''))
            }

            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setIsAuth(false, ''))
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setIsAuth(false, ''))
        dispatch(AuthActionCreators.setUser({} as IUser))
    }
}