import {AppDispatch} from "../..";
import {CartActionEnum, CartDeleteAllArt, CartGetArts, cartPost, CartSetIsLoading} from "./types";
import PostService from "../../../api/PostService";

export const CartActionCreators = {
    CartDeleteAllArt: (): CartDeleteAllArt => ({type: CartActionEnum.CART_DELETE_ALL_ARTS}),
    CartGetArt: (arts: cartPost[]): CartGetArts => ({type: CartActionEnum.CART_GET_ARTS, payload: arts}),

    CartSetIsLoading: (loading: boolean): CartSetIsLoading => ({
        type: CartActionEnum.CART_SET_IS_LOADING,
        payload: loading
    }),

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
            await PostService.addToCart(postId, token)
            const response = await PostService.getCart(token)
            if (response.data) {
                dispatch(CartActionCreators.CartGetArt(response.data))
            }
            dispatch(CartActionCreators.CartSetIsLoading(false))
        } catch (e) {
            dispatch(CartActionCreators.CartSetIsLoading(false))
        }
    }
}