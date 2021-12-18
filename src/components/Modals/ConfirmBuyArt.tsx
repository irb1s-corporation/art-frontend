import React, {FC} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface LoginProps {
    open: boolean;
}

const ConfirmBuyArt: FC<LoginProps> = (props) => {
    const {setBuyArtModal, addToCollection} = useActions()
    const {token} = useTypedSelector(state => state.auth)
    const {BuyArtId} = useTypedSelector(state => state.modals)
    const SubmitHandler = () => {
        return () => {
            addToCollection(token, BuyArtId)
            setBuyArtModal(false, 0)
        }
    }

    const ToggleModal = (value: boolean) => {
        return () => {
            setBuyArtModal(value, 0)
        }
    }
    return (
        <React.Fragment>
            <Dialog
                // fullScreen={'md'}
                open={props.open}
                onClose={ToggleModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Подтверждение операции "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: '#171719',mr:"auto"}} onClick={SubmitHandler()} autoFocus>
                        подтвердить
                    </Button>
                    <Button sx={{color: '#171719'}} autoFocus onClick={ToggleModal(false)}>
                        отменить
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ConfirmBuyArt;