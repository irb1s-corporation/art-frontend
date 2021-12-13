import {NotificationAction, NotificationActionEnum, NotificationState} from "./types";

const initialState: NotificationState = {
    text: '',
    show: false,
    color: '',
}

export default function notificationReducer(state = initialState, action: NotificationAction): NotificationState {
    switch (action.type) {
        case NotificationActionEnum.TOGGLE_NOTIFICATION:
            return {...state, text: action.payload.text, color: action.payload.color}
        default:
            return state
    }
}