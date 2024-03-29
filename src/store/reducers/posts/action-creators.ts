import {
    filterPricePosts,
    PostsActionEnum,
    setFindPosts,
    setIsLoadingPosts,
    setPosts,
    sortByHighPrice,
    sortByLowPrice,
    sortByNewPosts,
    sortByOldPosts,
    sortByPopular
} from "./types";
import {IPosts} from "../../../models/IPosts";
import {AppDispatch} from "../../index";
import {AuthActionCreators} from "../auth/action-creators";
import PostService from "../../../api/PostService";
import {NotificationActionCreators} from "../notification/action-creators";
import {ModalActionCreators} from "../modals/action-creators";

export const PostActionCreators = {
    setPosts: (posts: IPosts[]): setPosts => ({type: PostsActionEnum.SET_POSTS, payload: posts}),
    setFindPosts: (posts: IPosts[]): setFindPosts => ({type: PostsActionEnum.SET_FIND_POSTS, payload: posts}),

    setIsLoadingPosts: (payload: boolean): setIsLoadingPosts => ({
        type: PostsActionEnum.SET_IS_LOADING_POSTS,
        payload: payload
    }),

    getPosts: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(PostActionCreators.setIsLoadingPosts(true))
            const res = await PostService.getPopular()
            if (res.data) {
                dispatch(PostActionCreators.setPosts(res.data))
                dispatch(PostActionCreators.setIsLoadingPosts(false))
                if (localStorage.getItem('sort')) {
                    switch (Number(localStorage.getItem('sort'))) {
                        case 10:
                            return dispatch(PostActionCreators.sortByNewPosts());
                        case 20:
                            return dispatch(PostActionCreators.sortByOldPosts());
                        case 30:
                            return dispatch(PostActionCreators.sortByPopular());
                        case 40:
                            return dispatch(PostActionCreators.sortByLowPrice());
                        case 50:
                            return dispatch(PostActionCreators.sortByHighPrice());
                    }
                }
            }
        } catch (e) {
            // error
            dispatch(PostActionCreators.setIsLoadingPosts(false))
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
    addToCollection: (token: string, id: number) => async (dispatch: AppDispatch) => {
        try {
            const res = await PostService.addToCollection(id, token)
            if (res.data) {
                dispatch(ModalActionCreators.setBuyArtModal(false, 0))
            }
            dispatch(NotificationActionCreators.notificationToggle({
                text: "ART добавлен в коллекцию",
                color: "success",
                show: true
            }))
        } catch (e) {
            dispatch(ModalActionCreators.setBuyArtModal(false, 0))
            dispatch(NotificationActionCreators.notificationToggle({
                text: "Произошла ошибка",
                color: "error",
                show: true
            }))
        }
    },

    createPost: (token: string, title: string, files: any, about: string, price: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const create = await PostService.createPost(token, title, files, about, price)
            if (create.status === 201) {
                PostActionCreators.getPosts()
            }
            dispatch(NotificationActionCreators.notificationToggle({
                text: "ART успешно создан",
                color: "success",
                show: true
            }))
            dispatch(AuthActionCreators.setIsLoading(false));
        } catch (e) {
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(NotificationActionCreators.notificationToggle({
                text: "Произошла ошибка",
                color: "error",
                show: true
            }))
        }
    },

    //фильтр  и сартировка
    filterPostsPrice: (maxPrice: number, minPrice: number): filterPricePosts => ({
        type: PostsActionEnum.FILTER_PRICE_POSTS,
        maxPrice: maxPrice,
        minPrice: minPrice
    }),

    sortByNewPosts: (): sortByNewPosts => ({type: PostsActionEnum.SORT_BY_NEW_POSTS}),
    sortByOldPosts: (): sortByOldPosts => ({type: PostsActionEnum.SORT_BY_OLD_POSTS}),
    sortByHighPrice: (): sortByHighPrice => ({type: PostsActionEnum.SORT_BY_HIGH_PRICE}),
    sortByLowPrice: (): sortByLowPrice => ({type: PostsActionEnum.SORT_BY_LOW_PRICE}),
    sortByPopular: (): sortByPopular => ({type: PostsActionEnum.SORT_BY_POPULAR}),
}