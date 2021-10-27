import {CartAction, CartActionEnum, CartState} from "./types";
import {IPosts} from "../../../models/IPosts";

const initialState: CartState = {
    cartArts: [],
    cartPrice: 0,
}

export default function CartReducer(state = initialState, action: CartAction): CartState {
    switch (action.type) {
        case CartActionEnum.CART_ADD_ART:
            initialState.cartArts.push(action.payload)
            return {
                ...state,
                cartPrice: initialState.cartPrice += action.payload.price,
                cartArts: initialState.cartArts
            }
        case CartActionEnum.CART_DELETE_ART:
            let minusPrice = 0;
            initialState.cartArts.splice(initialState.cartArts.findIndex((art: IPosts,) => art.id === action.payload ? minusPrice = art.price : null
            ), 1)
            return {...state, cartPrice: initialState.cartPrice -= minusPrice, cartArts: initialState.cartArts}
        case CartActionEnum.CART_DELETE_ALL_ARTS:
            initialState.cartArts.splice(0, initialState.cartArts.length)
            return {...state, cartPrice: 0, cartArts: initialState.cartArts}
        default:
            return state;
    }
}