import {CartAction, CartActionEnum, CartState} from "./types";

const initialState: CartState = {
    cartArts: [],
    cartPrice: 0,
    cartIsLoading: false,
}

export default function CartReducer(state = initialState, action: CartAction): CartState {
    switch (action.type) {
        case CartActionEnum.CART_SET_IS_LOADING:
            return {...state, cartIsLoading: action.payload}
        case CartActionEnum.CART_GET_ARTS:
            return {...state, cartArts: action.payload}
        case CartActionEnum.CART_DELETE_ALL_ARTS:
            initialState.cartArts.splice(0, initialState.cartArts.length)
            return {...state, cartPrice: 0, cartArts: initialState.cartArts}
        default:
            return state;
    }
}