import React, {ChangeEvent, FC, useRef, useState} from "react";
import {Avatar, Button, Container, IconButton, TextField, Typography} from "@mui/material";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const CreateArt: FC = () => {
    const {token, user, isLoading} = useTypedSelector(state => state.auth);
    const inputFile = useRef(document.createElement("input"));

    const {createPost} = useActions()
    const [form, setForm] = useState({
        title: "",
        price: "",
        image: null,
        about: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        price: "",
        image: "",
        about: ""
    })
    const download = () => {

    }

    const inputImageChange = (image: any) => {
        return 'sad'
    }
    const submit = () => {
        createPost(token, form.title, inputFile.current.files, form.about, form.price)
    }

    return (
        <React.Fragment>
            <Container>
                <div className="PageTitle">
                    <Typography variant="h4">
                        Создать ART
                    </Typography>
                    <div className="hr"/>
                </div>
                <div className="Create">
                    <div className="Create__form">
                        <label>
                            <Button disabled={isLoading} sx={{mr: 'auto'}} variant="contained"
                                    onClick={() => inputFile.current.click()}
                            >
                                Загрузить картинку
                            </Button>
                            <input
                                ref={inputFile}
                                type='file' accept=".jpeg, .jpg, .png"
                                // onChange={(e: ChangeEvent<HTMLInput  Element>) => setForm({
                                //     ...form, image: e.target.files
                                // })}
                                hidden
                            />
                        </label>
                        <TextField
                            className="input"
                            label="Название"
                            name="name"
                            color="primary"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, title: e.target.value})}
                        />
                        <TextField
                            className="input"
                            label="Описание"
                            name="about"
                            color="primary"
                            multiline
                            rows={4}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, price: e.target.value})}
                        />
                        <TextField
                            className="input"
                            label="Цена"
                            type="number"
                            minRows={0}
                            name="price"
                            color="primary"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({...form, price: e.target.value})}
                        />
                    </div>
                </div>
                <div className='Create__footer'>
                    <Button disabled={isLoading} variant="contained"
                            onClick={() => submit()}
                    >
                        Создать
                    </Button>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default CreateArt;