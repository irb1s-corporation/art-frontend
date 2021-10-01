import React, {FC} from 'react';
import {Button, IconButton, Input, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './Modals.scss';

interface LoginProps {
    open: boolean;
    close: () => void;
}

const ariaLabel = {'aria-label': 'description'};

const LoginModal: FC<LoginProps> = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className='Form'>
                <div className='Form__header'>
                    <Typography variant='h6'>
                        Авторизация
                    </Typography>
                    <IconButton>
                        <CloseIcon onClick={() => props.close()}/>
                    </IconButton>
                </div>
                <div className='Form__content'>
                    <TextField
                        label="Email"
                        variant="standard"
                        color="warning"
                    />
                    <TextField
                        label="Password"
                        variant="standard"
                        color="warning"
                    />
                </div>
                <div className='Form__footer'>
                    <Button style={{backgroundColor: '#FBCB9C', margin: 'auto'}} variant="contained">
                        войти
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default LoginModal;