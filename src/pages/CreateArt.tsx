import React, {ChangeEvent, FC, useRef, useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const CreateArt: FC = () => {
    const {token, isLoading} = useTypedSelector(state => state.auth);
    const {createPost} = useActions()
    const history = useHistory()
    const inputFile = useRef(document.createElement("input"));

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

    const submit = () => {
        createPost(token, form.title, inputFile.current.files, form.about, form.price)
        history.push("/");
    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, title: e.target.value})
        if (e.target.value.length > 0) {
            setErrors({...errors, title: ''})
        } else {
            setErrors({...errors, title: 'Введите название'})
        }
    }

    const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, price: e.target.value})
        if (e.target.value.length > 0) {
            setErrors({...errors, price: ''})
        } else {
            setErrors({...errors, price: 'Введите цену'})
        }
    }

    const handleChangeAbout = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, about: e.target.value})
        if (e.target.value.length > 0) {
            setErrors({...errors, about: ''})
        } else {
            setErrors({...errors, about: 'Введите описание'})
        }
    }

    return (
        <React.Fragment>
            <Container maxWidth="xl">
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
                            error={errors.title.length > 0}
                            helperText={errors.title.length > 0 && errors.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeTitle(e)}
                        />
                        <TextField
                            className="input"
                            label="Описание"
                            name="about"
                            color="primary"
                            error={errors.about.length > 0}
                            helperText={errors.about.length > 0 && errors.about}
                            multiline
                            rows={4}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeAbout(e)}
                        />
                        <TextField
                            className="input"
                            label="Цена"
                            type="number"
                            minRows={0}
                            error={errors.price.length > 0}
                            helperText={errors.price.length > 0 && errors.price}
                            name="price"
                            color="primary"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePrice(e)}
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