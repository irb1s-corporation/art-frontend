import React, {FC, ReactChild, ReactChildren, useState} from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Filter.scss'
import {Button, IconButton, InputBase, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useActions} from "../../hooks/useActions";
import {SubmitHandler, useForm} from "react-hook-form";

interface PropsFilter {
    value: boolean
}

interface PropsFilterList {
    name: string
    children?: ReactChild | ReactChildren
}


const FilterList: FC<PropsFilterList> = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <div onClick={() => setOpen(!open)} className='Filter__list'>
                <button className='button'>
                    <div className='title'>
                        {props.name}
                    </div>
                </button>
                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </div>
            {open &&
            <div className="Filter__context">
                {props?.children}
            </div>
            }
        </React.Fragment>
    )
}

interface IFormInput {
    minPrice: number;
    maxPrice: number;
}

const Filter: FC<PropsFilter> = (props) => {
    const [open, setOpen] = useState(props.value);
    const {filterPostsPrice} = useActions()
    const {register, handleSubmit} = useForm<IFormInput>();
    const applyFilterPrice: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        filterPostsPrice(data.maxPrice, data.minPrice);
    }
    return (
        <div className='Filter'>
            <div className={`Filter-Wrapper ${!open && 'close'} `}>
                {open ?
                    <React.Fragment>
                        <div onClick={() => setOpen(false)} className='Filter__list'>
                            <button className='button'>
                                <div className='title'>
                                    <FilterListIcon style={{marginRight: '5px'}}/>
                                    Фильтр
                                </div>
                            </button>
                            <ArrowBackIcon/>
                        </div>
                        <FilterList name={'Цена'}>
                            <React.Fragment>
                                <form onSubmit={handleSubmit(applyFilterPrice)}>
                                    <div className="flex-wrapper">
                                        <TextField
                                            sx={{mr: '20px',}}
                                            label="Мин цена"
                                            {...register("minPrice")}
                                        />
                                        <TextField
                                            label="Макс цена"
                                            {...register("maxPrice")}
                                        />
                                    </div>
                                    <Button type="submit" sx={{mr: 'auto', mt: '20px'}} variant="contained">
                                        Применить
                                    </Button>
                                </form>
                            </React.Fragment>
                        </FilterList>
                        <FilterList name={'Автор'}>
                            <React.Fragment>
                                <div className="InputSearch">
                                    <InputBase
                                        sx={{ml: 1, flex: 1}}
                                        placeholder="Поиск"
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                                        <SearchIcon/>
                                    </IconButton>
                                </div>
                            </React.Fragment>
                        </FilterList>
                    </React.Fragment>
                    : <div onClick={() => setOpen(true)} className='Filter__list'>
                        <ArrowForwardIcon/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Filter;