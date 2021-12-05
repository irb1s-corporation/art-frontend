import {filterPricePosts, PostsActionEnum, setFindPosts, setPosts} from "./types";
import {IPosts} from "../../../models/IPosts";
import {AppDispatch} from "../../index";
import {AuthActionCreators} from "../auth/action-creators";
import PostService from "../../../api/PostService";

export const PostActionCreators = {
    setPosts: (posts: IPosts[]): setPosts => ({type: PostsActionEnum.SET_POSTS, payload: posts}),
    setFindPosts: (posts: IPosts[]): setFindPosts => ({type: PostsActionEnum.SET_FIND_POSTS, payload: posts}),
    filterPostsPrice: (maxPrice: number, minPrice: number): filterPricePosts => ({
        type: PostsActionEnum.FILTER_PRICE_POSTS,
        maxPrice: maxPrice,
        minPrice: minPrice
    }),

    getPosts: () => async (dispatch: AppDispatch) => {
        try {
            const res = await PostService.getPopular()
            if (res.data) {
                dispatch(PostActionCreators.setPosts(res.data))
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
                PostActionCreators.getPosts()
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
        }
    },
}