import React, {ChangeEvent, FC, useState} from 'react';
import {Button, IconButton, InputAdornment, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './Modals.scss';
import {useActions} from "../../hooks/useActions";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface LoginProps {
    open: boolean;
}

const Login: FC<LoginProps> = (props) => {
    const {login, setLoginModal} = useActions();
    const {isLoading, error} = useTypedSelector((state) => state.auth)

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const auth = () => {
        if (form.password.length > 0 && form.email.length > 0) login(form.email, form.password);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, password: e.target.value})
        if (e.target.value.length > 0) {
            setErrors({...errors, password: ''})
        } else {
            setErrors({...errors, password: 'Пароль не может быть пустым'})
        }
    }
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, email: e.target.value})
        if (e.target.value.length > 0) {
            setErrors({...errors, email: ''})
        } else {
            setErrors({...errors, email: 'Емайл не может быть пустым'})
        }
    }

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
                    <IconButton onClick={() => setLoginModal(false)}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className='Form__content'>
                    <TextField
                        className='input'
                        label="Емайл почта"
                        name={'email'}
                        variant="standard"
                        type={"email"}
                        color="primary"
                        error={errors.email.length > 0}
                        helperText={errors.email.length > 0 && errors.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)}
                    />
                    <TextField
                        className='input'
                        label="Пароль"
                        name={'password'}
                        variant="standard"
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        error={errors.password.length > 0}
                        helperText={errors.password.length > 0 && errors.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePassword(e)}
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
                    {error && <div style={{color: "red", marginTop: '20px'}}>{error}</div>}
                </div>
                <div className='Form__footer'>
                    <Button disabled={isLoading} onClick={() => auth()}
                            style={{backgroundColor: '#FBCB9C', margin: 'auto'}}
                            variant="contained">
                        войти
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default Login;