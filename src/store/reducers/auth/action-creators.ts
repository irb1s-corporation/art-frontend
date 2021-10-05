import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import {ModalActionCreators} from "../modals/action-creators";

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
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await UserService.Reg(user_nickname, user_email, user_password);
            if (response.data.token) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('token', response.data.token)
                // dispatch(AuthActionCreators.setUser(response.data.user))
                dispatch(AuthActionCreators.setIsAuth(true, response.data.token))
                dispatch(ModalActionCreators.setLoginModal(false))
            } else {
                dispatch(ModalActionCreators.setRegModal(false))
                dispatch(AuthActionCreators.setIsError('Некорректный логин или пароль'));
            }
        } catch (e) {

        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setIsAuth(false, ''))
        dispatch(AuthActionCreators.setUser({} as IUser))
    }
}