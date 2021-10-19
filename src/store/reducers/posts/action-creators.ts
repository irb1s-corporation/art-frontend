import {PostsActionEnum, setPopularPosts} from "./types";
import {IPosts} from "../../../models/IPosts";
import {AppDispatch} from "../../index";
import {AuthActionCreators} from "../auth/action-creators";
import PostService from "../../../api/PostService";

export const PostActionCreators = {
    setPopularPosts: (posts: IPosts[]): setPopularPosts => ({type: PostsActionEnum.SET_POPULAR_POSTS, payload: posts}),

    getPopular: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const res = await PostService.getPopular()
            if (res.data) {
                dispatch(PostActionCreators.setPopularPosts(res.data))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },

    createPost: (token: string, title: string, files: any, about: string, price: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const create = await PostService.createPost(token, title, files, about, price)
            if (create.status == 201) {
                const res = await PostService.getPopular()
                if (res.data) {
                    dispatch(PostActionCreators.setPopularPosts(res.data))
                }
            }
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    }
}