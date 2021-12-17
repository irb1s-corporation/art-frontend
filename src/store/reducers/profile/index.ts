import {IUser} from "../../../models/IUser";
import {ProfileAction, ProfileActionEnum, ProfileState} from "./types";

const initialState: ProfileState = {
    userPosts: [],
    userForGuest: {} as IUser,
    userCollection: [],
    userPostsForGuest: [],
    userCollectionForGuest: [],
    isLoadingProfile: false,
}
export default function ProfileReducer(state = initialState, action: ProfileAction) {
    switch (action.type) {
        case ProfileActionEnum.SET_USER_POSTS:
            return {...state, userPosts: action.payload}
        case ProfileActionEnum.SET_USER_POSTS_FOR_GUEST:
            return {...state, userPostsForGuest: action.payload}
        case ProfileActionEnum.SET_USER_COLLECTION_FOR_GUEST:
            return {...state, userCollectionForGuest: action.payload}
        case ProfileActionEnum.SET_USER_COLLECTION:
            return {...state, userCollection: action.payload}
        case ProfileActionEnum.SET_USER_FOR_GUEST:
            return {...state, userForGuest: action.payload}
        case ProfileActionEnum.SET_IS_LOADING_PROFILE:
            return {...state, isLoadingProfile: action.payload}
        default:
            return state
    }
}
