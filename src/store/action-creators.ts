import {AuthActionCreators} from "./reducers/auth/action-creators";
import {ModalActionCreators} from "./reducers/modals/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...ModalActionCreators
}