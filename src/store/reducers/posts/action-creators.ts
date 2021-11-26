import {PostsActionEnum, setFindPosts, setPopularPosts} from "./types";
import {IPosts} from "../../../models/IPosts";
import {AppDispatch} from "../../index";
import {AuthActionCreators} from "../auth/action-creators";
import PostService from "../../../api/PostService";

export const PostActionCreators = {
    setPopularPosts: (posts: IPosts[]): setPopularPosts => ({type: PostsActionEnum.SET_POPULAR_POSTS, payload: posts}),
    setFindPosts: (posts: IPosts[]): setFindPosts => ({type: PostsActionEnum.SET_FIND_POSTS, payload: posts}),
    getPopular: () => async (dispatch: AppDispatch) => {
        try {
            const res = await PostService.getPopular()
            if (res.data) {
                dispatch(PostActionCreators.setPopularPosts(res.data))
            }
        } catch (e) {
            // error
        }
    },

    findPosts: (content: string) => async (dispatch: AppDispatch) => {
        try {
            const res = await PostService.findPosts(content)
            if (res.data) {
                dispatch(PostActionCreators.setFindPosts(res.data))
            }
        } catch (e) {
            // error
        }
    },

    createPost: (token: string, title: string, files: any, about: string, price: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const create = await PostService.createPost(token, title, files, about, price)
            if (create.status === 201) {
                PostActionCreators.getPopular()
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },


}