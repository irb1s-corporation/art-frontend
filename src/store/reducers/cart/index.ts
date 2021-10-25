import {CartAction, CartActionEnum, CartState} from "./types";

const initialState: CartState = {
    arts: [],
    price: 0
}

export default function CartReducer(state = initialState, action: CartAction): CartState {
    switch (action.type) {
        case CartActionEnum.ADD_ART:
            initialState.arts.push(action.payload)
            initialState.price += action.payload.price
            return {...state}
        default:
            return state;
    }
}