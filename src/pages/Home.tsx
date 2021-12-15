import React, {FC, useEffect, useState, Suspense} from 'react';
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import './Pages.scss';
import {IPosts} from "../models/IPosts";
import {useTypedSelector} from "../hooks/useTypedSelector";
import Filter from "../components/Filter/Filter";
import {useActions} from "../hooks/useActions";
import SkeletonArt from "../components/Art/SkeletonArt";

const Art = React.lazy(() => import('../components/Art/Art'));

const Sort = React.memo(() => {
    const [sort, setSort] = useState('');
    const [open, setOpen] = useState(false);
    const {sortByNewPosts, sortByOldPosts, sortByHighPrice, sortByLowPrice, sortByPopular} = useActions()

    useEffect(() => {
        setSort(String(localStorage.getItem('sort')))
    }, [])

    const handleChange = (event: SelectChangeEvent<typeof sort>) => {
        setSort(event.target.value as string);
        localStorage.setItem('sort', event.target.value)
        switch (Number(event.target.value)) {
            case 10:
                return sortByNewPosts();
            case 20:
                return sortByOldPosts()
            case 30:
                return sortByPopular()
            case 40:
                return sortByLowPrice()
            case 50:
                return sortByHighPrice()
        }
    };

    const toggleSort = () => {
        return () => {
            setOpen(!open)
        }
    }
    return (
        <FormControl sx={{mb: 2, width: 230,}}>
            <InputLabel id="demo-controlled-open-select-label">Сортировать по</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={toggleSort()}
                onOpen={toggleSort()}
                value={sort}
                label="Сортировать по"
                onChange={handleChange}
            >
                <MenuItem value={10}>Самое новое</MenuItem>
                <MenuItem value={20}>Самое старое</MenuItem>
                <MenuItem value={30}>Популярные</MenuItem>
                <MenuItem value={40}>Цена: по возврастанию</MenuItem>
                <MenuItem value={50}>Цена: по убыванию</MenuItem>
            </Select>
        </FormControl>
    )
})


const Home: FC = () => {
    const {filterPosts, isLoadingPosts} = useTypedSelector(state => state.posts)

    return (
        <div className='Home '>
            <Filter value={false}/>
            <Container maxWidth="xl" sx={{mt: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Sort/>
                </div>
                <Grid
                    container
                    spacing={6}
                    columns={{xs: 1, sm: 4, md: 8, lg: 12, xl: 16}}
                >
                    {filterPosts.map((post: IPosts, index: number) => (
                        isLoadingPosts ? (
                            <Grid key={post.id + '_' + index} item
                                  xs={1}
                                  sm={4}
                                  md={4}
                                  lg={4}
                                  xl={4}
                            >
                                <SkeletonArt/>
                            </Grid>
                        ) : (
                            <Grid key={post.id + '_' + index} item
                                  xs={1}
                                  sm={4}
                                  md={4}
                                  lg={4}
                                  xl={4}
                            >
                                <Suspense fallback={<SkeletonArt/>}>
                                    <Art
                                        art={post}
                                    />
                                </Suspense>
                            </Grid>
                        )
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Home;