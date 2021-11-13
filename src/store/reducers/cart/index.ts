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
            let count = 0
            action.payload.forEach((post) => {
                count += post.post.price
            })

            return {...state, cartArts: action.payload, cartPrice: count}
        default:
            return state;
    }
}