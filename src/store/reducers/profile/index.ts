import {ProfileAction, ProfileActionEnum, ProfileState} from "./types";

const initialState: ProfileState = {
    userPosts: []
}
export default function ProfileReducer(state = initialState, action: ProfileAction) {
    switch (action.type) {
        case ProfileActionEnum.SET_USER_POSTS:
            return {...state, userPosts: action.payload}
        default: return state
    }
}
