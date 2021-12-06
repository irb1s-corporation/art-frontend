import React, {FC, MutableRefObject, useRef, useState} from "react";
import {Button, Container, IconButton, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {SubmitHandler, useForm} from "react-hook-form";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ImageIcon from '@mui/icons-material/Image';

interface IFormInput {
    name: string;
    description: string;
    price: string;
}



const CreateArt: FC = () => {
    const {token} = useTypedSelector(state => state.auth);
    const {createPost} = useActions()
    const history = useHistory()
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
    const [file, setFile] = useState('');
    const inputFile = useRef(document.createElement("input")) as MutableRefObject<HTMLInputElement>;

    const submit: SubmitHandler<IFormInput> = (data) => {
        if (inputFile.current.files && data) {
            createPost(token, data.name, inputFile.current.files, data.description, data.price)
            history.push("/");
        }
    }
    const handleChangeImage = () => {
        if (inputFile.current.files) {
            setFile(URL.createObjectURL(inputFile.current.files[0]))
        }
    }
    const handleDeleteImage = () => {
        if (inputFile.current.files) {
            inputFile.current.value = ''
            setFile('')
        }
    }
    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        inputFile.current.files = e.dataTransfer.files
        setFile(URL.createObjectURL(e.dataTransfer.files[0]))
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
                                    <div
                                        onDragStart={(e) => e.preventDefault()}
                                        onDragLeave={(e) => e.preventDefault()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => onDropHandler(e)}
                                        className='drop-area'
                                    >
                                        <div className='image-back'>
                                            {file && (
                                                <img
                                                    alt={'loadFile'}
                                                    src={file}/>
                                            )}
                                        </div>
                                        <div className='icon'>
                                            <ImageIcon sx={{fontSize: 100, color: '#FBCB9C'}}/>
                                        </div>
                                    </div>
                                    <input
                                        ref={inputFile}
                                        type='file' accept=".jpeg, .jpg, .png, .gif"
                                        onChange={() => handleChangeImage()}
                                        hidden
                                    />
                                </label>
                                {file && (
                                    <IconButton className='deleteFile' onClick={handleDeleteImage}>
                                        <HighlightOffIcon/>
                                    </IconButton>
                                )}
                                {/*{errors.image && <p>{errors.image}</p>}*/}
                            </div>
                            <TextField
                                className="input"
                                label="Название"
                                color="primary"
                                InputProps={{inputProps: {maxLength: 30}}}
                                error={!!errors?.name}
                                {...register("name", {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 30,
                                })}
                            />
                            <TextField
                                className="input"
                                label="Описание"
                                color="primary"
                                multiline
                                rows={4}
                                error={!!errors?.description}
                                InputProps={{inputProps: {maxLength: 250}}}
                                {...register("description", {
                                    required: true,
                                    minLength: 0,
                                    maxLength: 250,
                                })}
                            />
                            <TextField
                                className="input"
                                label="Цена"
                                type="number"
                                minRows={0}
                                color="primary"
                                InputProps={{inputProps: {min: 0}}}
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