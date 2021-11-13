import {AppDispatch} from "../..";
import {CartActionEnum, CartGetArts, cartPost, CartSetIsLoading} from "./types";
import PostService from "../../../api/PostService";
import CartService from "../../../api/CartService";

export const CartActionCreators = {
    CartGetArt: (arts: cartPost[]): CartGetArts => ({type: CartActionEnum.CART_GET_ARTS, payload: arts}),

    CartSetIsLoading: (loading: boolean): CartSetIsLoading => ({
        type: CartActionEnum.CART_SET_IS_LOADING,
        payload: loading
    }),


    CartDeleteAllArt: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartActionCreators.CartSetIsLoading(true))
            const response = await CartService.deleteAllPosts(token)
            if (response.data) {
                dispatch(CartActionCreators.CartGetArt(response.data))
            }
            dispatch(CartActionCreators.CartSetIsLoading(false))
        } catch (e) {
            dispatch(CartActionCreators.CartSetIsLoading(false))
        }
    },
    CartDeleteArt: (id: number, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartActionCreators.CartSetIsLoading(true))
            const response = await CartService.deletePost(id,token)
            if (response.data) {
                dispatch(CartActionCreators.CartGetArt(response.data))
            }
            dispatch(CartActionCreators.CartSetIsLoading(false))
        } catch (e) {
            dispatch(CartActionCreators.CartSetIsLoading(false))
        }
    },

    GetCart: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartActionCreators.CartSetIsLoading(true))
            const response = await PostService.getCart(token)
            if (response.data) {
                dispatch(CartActionCreators.CartGetArt(response.data))
            }
            dispatch(CartActionCreators.CartSetIsLoading(false))
        } catch (e) {
            dispatch(CartActionCreators.CartSetIsLoading(false))
        }
    },

    AddArtToCart: (postId: number, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartActionCreators.CartSetIsLoading(true))
            const response = await PostService.addToCart(postId, token)
            if (response.data) {
                dispatch(CartActionCreators.CartGetArt(response.data))
            }
            dispatch(CartActionCreators.CartSetIsLoading(false))
        } catch (e) {
            dispatch(CartActionCreators.CartSetIsLoading(false))
        }
    }
}