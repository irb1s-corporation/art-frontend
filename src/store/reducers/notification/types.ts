import {AlertColor} from "@mui/material";

export interface NotificationState {
    show: boolean;
    text: string;
    color: AlertColor;
}

export enum NotificationActionEnum {
    TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION'
}

export interface ToggleNotificationAction {
    type: NotificationActionEnum.TOGGLE_NOTIFICATION
    payload: {
        text: string;
        color: AlertColor;
        show: boolean;
    }
}

export type NotificationAction = ToggleNotificationAction