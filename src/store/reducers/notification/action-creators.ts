import {NotificationActionEnum, ToggleNotificationAction} from "./types";
import {AlertColor} from "@mui/material";

interface payloadToggle {
    text: string,
    color: AlertColor
    show: boolean
}

export const NotificationActionCreators = {
    notificationToggle: (payload: payloadToggle): ToggleNotificationAction => ({
        type: NotificationActionEnum.TOGGLE_NOTIFICATION,
        payload: {
            text: payload.text,
            color: payload.color,
            show: payload.show
        }
    })
}