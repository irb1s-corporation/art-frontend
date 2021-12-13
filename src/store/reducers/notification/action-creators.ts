import {NotificationActionEnum, ToggleNotificationAction} from "./types";

interface payloadToggle {
    text: string,
    color: string
}

export const NotificationActionCreators = {
    notificationToggle: (payload: payloadToggle): ToggleNotificationAction => ({
        type: NotificationActionEnum.TOGGLE_NOTIFICATION,
        payload: {
            text: payload.text,
            color: payload.color
        }
    })
}