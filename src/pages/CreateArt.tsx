import React, {ChangeEvent, FC, MutableRefObject, useRef, useState} from "react";
import {Button, Container, IconButton, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CreateArt: FC = () => {
    const {token, isLoading} = useTypedSelector(state => state.auth);
    const {createPost} = useActions()
    const history = useHistory()
    const [validateForm, SetValidateForm] = useState(true)
    const inputFile = useRef(document.createElement("input")) as MutableRefObject<HTMLInputElement>;

    const [form, setForm] = useState({
        image: "",
        title: "",
        price: "",
        about: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        price: "",
        image: "",
        about: ""
    })

    const submit = () => {
        if (validateForm) {
            createPost(token, form.title, inputFile.current.files, form.about, form.price)
            history.push("/");
        }
    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, title: e.target.value})
        chekForm()
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
        chekForm()
        if (e.target.value.length > 0) {
            setErrors({...errors, about: ''})
        } else {
            setErrors({...errors, about: 'Введите описание'})
        }
    }
    const handleChangeImage = () => {
        if (inputFile.current.files) {
            chekForm()
            setForm({
                ...form, image: inputFile.current.files[0].name
            })
        }
    }
    const handleDeleteImage = () => {
        if (inputFile.current.files) {
            inputFile.current.value = ''
            setForm({
                ...form, image: ''
            })
        }
    }
    const chekForm = () => {
        switch (true) {
            case form.image === "":
                return SetValidateForm(true)
            case form.title === "":
                return SetValidateForm(true)
            case form.price === "":
                return SetValidateForm(true)
            case form.about === "":
                return SetValidateForm(true)
            default:
                return SetValidateForm(false)
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
                        <div className='header'>
                            <label>
                                <Button disabled={isLoading} sx={{mr: 'auto'}} variant="contained"
                                        onClick={() => inputFile.current.click()}
                                >
                                    Загрузить картинку
                                </Button>
                                <input
                                    ref={inputFile}
                                    type='file' accept=".jpeg, .jpg, .png"
                                    onChange={() => handleChangeImage()}
                                    hidden
                                />
                            </label>
                            {form.image && (
                                <React.Fragment>
                                    <div className="previewFile">
                                        {form.image}
                                    </div>
                                    <IconButton onClick={() => handleDeleteImage()} className='delete'>
                                        <HighlightOffIcon/>
                                    </IconButton>
                                </React.Fragment>
                            )}
                            {errors.image && <p>{errors.image}</p>}

                        </div>

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
                    <Button disabled={validateForm} variant="contained"
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