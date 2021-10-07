import React, {ChangeEvent, FC, useState} from 'react';
import {Avatar, Container, IconButton, TextField, Typography} from "@mui/material";
import {ROOT_URL} from "../config";
import {useTypedSelector} from "../hooks/useTypedSelector";
import CreateIcon from '@mui/icons-material/Create';

const Profile: FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const [form, setForm] = useState({
        name: "",
    })
    return (
        <React.Fragment>
            <Container>
                <div className='Profile'>
                    <div className='Profile__avatar'>
                        <Typography variant="h5">
                            Аватарка
                        </Typography>
                        <IconButton>
                            <Avatar
                                alt="User Avatar"
                                src={ROOT_URL + 'avatar/' + user.avatar}
                                sx={{width: 120, height: 120}}
                            />
                            <CreateIcon className='icon'/>
                        </IconButton>
                    </div>
                    <div className='Profile__form'>
                        <TextField
                            className='input'
                            label="Имя"
                            name='name'
                            value={user.name}
                            variant="standard"
                            type={"email"}
                            color="primary"
                            // error={errors.email.length > 0}
                            // helperText={errors.email.length > 0 && errors.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, name: e.target.value})}
                        />
                        <TextField
                            className='input'
                            label="Фамилия"
                            name='name'
                            value={user.surname}
                            variant="standard"
                            type={"email"}
                            color="primary"
                            // error={errors.email.length > 0}
                            // helperText={errors.email.length > 0 && errors.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, name: e.target.value})}
                        />
                    </div>

                </div>
            </Container>
        </React.Fragment>
    );
};

export default Profile;