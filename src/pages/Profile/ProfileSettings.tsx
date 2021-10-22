import React, {ChangeEvent, useRef, useState} from 'react';
import {Avatar, Button, IconButton, TextField, Typography} from "@mui/material";
import {ROOT_URL} from "../../config";
import CreateIcon from "@mui/icons-material/Create";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const ProfileSettings = () => {
    const {token, user, isLoading} = useTypedSelector(state => state.auth);
    const inputFile = useRef(document.createElement("input"));
    const {saveInfo, saveAvatar} = useActions();

    const submit = () => {
        saveInfo(token, form.name, form.surname, form.about)
    }
    const avatarChange = (file: any) => {
        saveAvatar(token, file)
    }
    const [form, setForm] = useState({
        name: user.name,
        surname: user.surname,
        about: user.about
    })
    // const [errors, setErrors] = useState({
    //     name: "",
    //     surname: "",
    //     about: ""
    // })
    return (
        <React.Fragment>
            <div className='Profile'>
                <div className='Profile__form'>
                    <TextField
                        className='input'
                        label="Имя"
                        name='name'
                        defaultValue={user.name}
                        color="primary"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, name: e.target.value})}
                    />
                    <TextField
                        className='input'
                        label="Фамилия"
                        name='name'
                        defaultValue={user.name}
                        type={"text"}
                        color="primary"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, surname: e.target.value})}
                    />
                    <TextField
                        className='input'
                        label="О себе"
                        name='about'
                        defaultValue={user.about}
                        type={"text"}
                        color="primary"
                        multiline
                        rows={4}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, about: e.target.value})}
                    />

                </div>
                <div className='Profile__avatar'>
                    <label>
                        <IconButton
                            onClick={() => inputFile.current.click()}
                        >
                            <Avatar
                                alt="User Avatar"
                                src={ROOT_URL + 'avatar/' + user.avatar}
                                sx={{width: 150, height: 150}}
                            />
                            <CreateIcon className='icon'/>
                        </IconButton>
                        <input
                            ref={inputFile}
                            type='file' accept=".jpeg, .jpg, .png"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => avatarChange(e.target.files)}
                            hidden
                        />
                    </label>
                    <Typography variant='h6'>
                        {user.nickname}
                    </Typography>
                </div>
            </div>
            <div className='Profile__footer'>
                <Button disabled={isLoading} sx={{mr: 'auto'}} variant="contained"
                        onClick={() => submit()}
                >
                    Сохранить
                </Button>
            </div>
        </React.Fragment>
    )
        ;
};

export default ProfileSettings;