

export interface NotificationState {
    show: boolean;
    text: string;
    color: string;
}

export enum NotificationActionEnum {
    TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION'
}

export interface ToggleNotificationAction {
    type: NotificationActionEnum.TOGGLE_NOTIFICATION
    payload: {
        text: string;
        color: string;
    }
}

export type NotificationAction = ToggleNotificationAction