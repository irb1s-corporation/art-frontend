import {AuthActionCreators} from "./reducers/auth/action-creators";
import {ModalActionCreators} from "./reducers/modals/action-creators";
import {ProfileActionCreators} from "./reducers/profile/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...ModalActionCreators,
    ...ProfileActionCreators,
}