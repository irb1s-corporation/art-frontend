import {CartAction, CartActionEnum, CartState} from "./types";

const initialState: CartState = {
    arts: [],
    price: 0,
}

export default function CartReducer(state = initialState, action: CartAction): CartState {
    switch (action.type) {
        case CartActionEnum.ADD_ART:
            initialState.arts.push(action.payload)
            return {...state, price: initialState.price += action.payload.price}
        case CartActionEnum.DELETE_ART:
            let minusPrice = 0;
            initialState.arts.find((art, index) => {
                    if (art.id === action.payload) {
                        initialState.arts.splice(index, 1)
                        minusPrice = art.price
                    }
                }
            )
            return {...state, price: initialState.price -= minusPrice}
        case CartActionEnum.DELETE_ALL_ARTS:
            initialState.arts.splice(0, initialState.arts.length)
            return {...state, price: 0}
        default:
            return state;
    }
}