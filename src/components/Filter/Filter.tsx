import React, {FC, useEffect, useState} from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PropsFilter {
    value: boolean
}

const Filter: FC<PropsFilter> = (props) => {
    const [open, setOpen] = useState(props.value);

    return (
        <div className='Filter'>
            <div className={`Filter-Wrapper ${!open && 'close'} `}>
                {open ?
                    <div onClick={() => setOpen(false)} className='Filter__list'>
                        <button className='button'>
                            <div className='title'>
                                <FilterListIcon style={{marginRight: '5px'}}/>
                                Filter
                            </div>
                        </button>
                        <ArrowBackIcon/>
                    </div>
                    : <div onClick={() => setOpen(true)} className='Filter__list'>
                        <ArrowForwardIcon/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Filter;