import React, {FC, useState} from 'react';
import {Button, IconButton, Input, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './Modals.scss';
import {useActions} from "../../hooks/useActions";

interface LoginProps {
    open: boolean;
    close: () => void;
}


const LoginModal: FC<LoginProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, serPassword] = useState('');
    const {login} = useActions();

    const auth = () => {
        login(email, password);
    }

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
                        className='input'
                        label="Email"
                        variant="standard"
                        color="primary"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        style={{
                            width: '80%'
                        }}
                        label="Password"
                        variant="standard"
                        color="primary"
                        onChange={(e) => serPassword(e.target.value)}
                    />
                </div>
                <div className='Form__footer'>
                    <Button onClick={() => auth()} style={{backgroundColor: '#FBCB9C', margin: 'auto'}}
                            variant="contained">
                        войти
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default LoginModal;