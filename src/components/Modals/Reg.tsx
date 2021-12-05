import React, { FC, useState} from 'react';
import {Button, IconButton, InputAdornment, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useActions} from "../../hooks/useActions";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {SubmitHandler, useForm} from "react-hook-form";

interface RegProps {
    open: boolean,
}

interface IFormInput {
    nickname: string;
    password: string;
    email: string;
}


const Reg: FC<RegProps> = (props) => {
    const {reg, setRegModal, setLoginModal} = useActions();
    const {isLoading, error} = useTypedSelector((state) => state.auth)

    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();

    const auth: SubmitHandler<IFormInput> = (data) => {
        if (data.password.length > 0 && data.nickname.length > 0 && data.email.length > 0) reg(data.nickname, data.email, data.password);
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <Modal
            open={props.open}
            onClose={() => setRegModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className='Form' onSubmit={handleSubmit(auth)}>
                <div className='Form__header'>
                    <Typography variant='h6'>
                        Регистрация
                    </Typography>
                    <IconButton onClick={() => setRegModal(false)}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className='Form__content'>
                    <TextField
                        className='input'
                        label="Ник"
                        variant="standard"
                        color="primary"
                        {...register("nickname", {
                            required: true,
                        })}
                        error={!!errors?.nickname}
                        helperText={errors?.nickname?.type === 'required' ? 'Это обязательное поле' : null}
                    />
                    <TextField
                        className='input'
                        label="Емайл почта"
                        variant="standard"
                        color="primary"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email"   ,
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
                        helperText={errors?.password?.type === 'minLength' ? 'Минимальное количество символов 2' : errors?.password?.type === 'required' ? 'Это обязательное поле' : null}
                        {...register("password", {
                            required: true,
                            minLength: 2
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
                    {error.split(' ')[0] === 'Произошла' &&
                    <div style={{
                        color: "red",
                        marginTop: '20px'
                    }}>
                        {error}
                    </div>}
                </div>
                <div className='Form__footer'>
                    <Button disabled={isLoading} type="submit"
                            style={{backgroundColor: '#FBCB9C', margin: 'auto'}}
                            variant="contained">
                        Регистрация
                    </Button>
                    <Button
                        style={{
                            fontSize: '12px'
                        }}
                        sx={{
                            mt: '14px', color: '#171719'
                        }} variant="text"
                        onClick={() => {
                            setLoginModal(true)
                            setRegModal(false)
                        }}>
                        войти
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default Reg;