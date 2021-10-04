import React, {FC, useState} from 'react';
import {Button, IconButton, Input, InputAdornment, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './Modals.scss';
import {useActions} from "../../hooks/useActions";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface LoginProps {
    open: boolean;
}

const Login: FC<LoginProps> = (props) => {
    const {login, setLoginModal} = useActions();
    const auth = () => {
        login(form.email, form.password);
    }
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <Modal
            open={props.open}
            onClose={() => setLoginModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className='Form'>
                <div className='Form__header'>
                    <Typography variant='h6'>
                        Авторизация
                    </Typography>
                    <IconButton>
                        <CloseIcon onClick={() => setLoginModal(false)}/>
                    </IconButton>
                </div>
                <div className='Form__content'>
                    <TextField
                        className='input'
                        label="Емайл почта"
                        variant="standard"
                        color="primary"
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                    <TextField
                        className='input'
                        label="Пароль"
                        variant="standard"
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
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

export default Login;