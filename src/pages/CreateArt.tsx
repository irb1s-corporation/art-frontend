import React, {FC, MutableRefObject, useRef, useState} from "react";
import {Button, Container, IconButton, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {SubmitHandler, useForm} from "react-hook-form";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface IFormInput {
    name: string;
    description: string;
    price: string;
}


const CreateArt: FC = () => {
    const {token, isLoading} = useTypedSelector(state => state.auth);
    const {createPost} = useActions()
    const history = useHistory()
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
    const [drag, setDrag] = useState(true)
    const [file, setFile] = useState("");
    const inputFile = useRef(document.createElement("input")) as MutableRefObject<HTMLInputElement>;

    const submit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        console.log(errors)
        console.log(inputFile.current.files)
        // if (!validateForm) {
        //     createPost(token, form.title, inputFile.current.files, form.about, form.price)
        //     history.push("/");
        // }
    }
    const handleChangeImage = () => {
        if (inputFile.current.files) {
            setFile(inputFile.current.files[0].name)
        }
    }
    const handleDeleteImage = () => {
        if (inputFile.current.files) {
            inputFile.current.value = ''
            setFile("")
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
                <form onSubmit={handleSubmit(submit)}>
                    <div className="Create">
                        <div className="Create__form">
                            <div className='header'>
                                <label>
                                    <Button
                                        disabled={isLoading} sx={{mr: 'auto'}} variant="contained"
                                        onClick={() => inputFile.current.click()}
                                    >
                                        Загрузить картинку
                                    </Button>
                                    <input
                                        ref={inputFile}
                                        type='file' accept=".jpeg, .jpg, .png, .gif"
                                        onChange={() => handleChangeImage()}
                                        hidden
                                    />
                                </label>
                                {file && (
                                    <React.Fragment>
                                        <div className="previewFile">
                                            {file}
                                        </div>
                                        <IconButton onClick={() => handleDeleteImage()} className='delete'>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                    </React.Fragment>
                                )}
                                {/*{errors.image && <p>{errors.image}</p>}*/}

                            </div>

                            <TextField
                                className="input"
                                label="Название"
                                color="primary"
                                {...register("name", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 25,
                                })}
                            />
                            <TextField
                                className="input"
                                label="Описание"
                                color="primary"
                                multiline
                                rows={4}
                                {...register("description", {
                                    required: true,
                                    minLength: 1,
                                    maxLength: 150,
                                })}
                            />
                            <TextField
                                className="input"
                                label="Цена"
                                type="number"
                                minRows={0}
                                color="primary"
                                error={!!errors?.price}
                                helperText={errors?.price?.type === 'required' ? 'Минимальное количество символов 2' : errors?.price?.type === 'min' ? 'Это обязательное поле' : null}
                                {...register("price", {
                                    required: true,
                                    min: 0,
                                })}
                            />
                        </div>
                        <div className='Create__footer'>
                            <Button
                                // disabled={data > 0}
                                type="submit"
                                variant="contained"
                            >
                                Создать
                            </Button>
                        </div>
                    </div>
                </form>
            </Container>
        </React.Fragment>
    );
};

export default CreateArt;