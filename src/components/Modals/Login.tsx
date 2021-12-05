import React, {FC, useState} from 'react';
import {Button, IconButton, InputAdornment, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './Modals.scss';
import {useActions} from "../../hooks/useActions";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useForm, SubmitHandler} from "react-hook-form";

interface LoginProps {
    open: boolean;
}

interface IFormInput {
    password: string;
    email: string;
}

const Login: FC<LoginProps> = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
    const {login, setRegModal, setLoginModal} = useActions();
    const {error} = useTypedSelector((state) => state.auth)

    const auth: SubmitHandler<IFormInput> = (data) => {
        if (data.password.length > 0 && data.email.length > 0) login(data.email, data.password);
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
            <form className='Form' onSubmit={handleSubmit(auth)}>
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
                        variant="standard"
                        type={"email"}
                        color="primary"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email",
                            }
                        })}
                        error={!!errors?.email}
                        helperText={errors?.email?.type === 'required' ? 'Это обязательное поле' : errors?.email?.message ? "Некорректный email" : null}
                    />
                    <TextField
                        className='input'
                        label="Пароль"
                        variant="standard"
                        color="primary"
                        type={showPassword ? "text" : "password"}
                        error={!!errors?.password}
                        helperText={errors?.password?.type === 'required' ? 'Это обязательное поле' : null}
                        {...register("password", {
                            required: true,
                        })}
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
                    <Button type="submit"
                            style={{backgroundColor: '#FBCB9C', margin: 'auto'}}
                            variant="contained">
                        войти
                    </Button>
                    <Button
                        style={{
                            fontSize: '12px'
                        }}
                        sx={{
                            mt: '14px', color: '#171719'
                        }} variant="text"
                        onClick={() => {
                            setLoginModal(false)
                            setRegModal(true)
                        }}>
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default Login;