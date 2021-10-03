import React, {FC, useState} from 'react';
import {Button, IconButton, InputAdornment, Modal, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useActions} from "../../hooks/useActions";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface RegProps {
    open: boolean,
    close: () => void,
}

const RegModal: FC<RegProps> = (props) => {
    const {reg} = useActions();
    const [form, setForm] = useState({
        nickname: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const auth = () => {
        reg(form.nickname, form.email, form.password);
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
                        Регистрация
                    </Typography>
                    <IconButton>
                        <CloseIcon onClick={() => props.close()}/>
                    </IconButton>
                </div>
                <div className='Form__content'>
                    <TextField
                        className='input'
                        label="Никнэйм"
                        variant="standard"
                        color="primary"
                        onChange={(e) => setForm({...form, nickname: e.target.value})}
                    />
                    <TextField
                        className='input'
                        label="Емайл"
                        variant="standard"
                        color="primary"
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                    <TextField
                        style={{
                            width: '80%'
                        }}
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
                        Регистрация
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default RegModal;