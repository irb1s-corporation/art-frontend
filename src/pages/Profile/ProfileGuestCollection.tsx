import React, {Suspense, useState} from 'react';
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SkeletonArt from "../../components/Art/SkeletonArt";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
const Art = React.lazy(() => import('../../components/Art/Art'))

const Sort = React.memo(() => {
    const [sort, setSort] = useState('');
    const [open, setOpen] = useState(false);
    const {userCollectionForGuest} = useTypedSelector(state => state.profile)
    const {setUserCollectionForGuest} = useActions()
    const handleChange = (event: SelectChangeEvent<typeof sort>) => {
        setSort(event.target.value as string);
        switch (Number(event.target.value)) {
            case 10:
                return setUserCollectionForGuest(
                    userCollectionForGuest.sort((a, b) => {
                        if (a.post.createdAt > b.post.createdAt) {
                            return -1
                        } else {
                            return +1
                        }
                    })
                );
            case 20:
                return setUserCollectionForGuest(
                    userCollectionForGuest.sort((a, b) => {
                        if (a.post.createdAt < b.post.createdAt) {
                            return -1
                        } else {
                            return +1
                        }
                    })
                );
            case 30:
                return setUserCollectionForGuest(userCollectionForGuest.sort((a, b) => {
                    if (a.post.views && b.post.views) {
                        if (a.post.views.length > b.post.views.length) {
                            return -1
                        } else {
                            return +1
                        }
                    } else {
                        return -1
                    }
                }))
            case 40:
                return setUserCollectionForGuest(userCollectionForGuest.sort((a, b) => {
                    if (a.post.price < b.post.price) {
                        return -1
                    } else {
                        return +1
                    }
                }))
            case 50:
                return setUserCollectionForGuest(userCollectionForGuest.sort((a, b) => {
                    if (a.post.price > b.post.price) {
                        return -1
                    } else {
                        return +1
                    }
                }))
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
                <MenuItem value={10}>Недавно созданное</MenuItem>
                <MenuItem value={20}>Самое старое</MenuItem>
                <MenuItem value={30}>Популярные</MenuItem>
                <MenuItem value={40}>Цена: по возврастанию</MenuItem>
                <MenuItem value={50}>Цена: по убыванию</MenuItem>
            </Select>
        </FormControl>
    )
})


const ProfileGuestCollection = () => {
    const {userCollectionForGuest, isLoadingProfile} = useTypedSelector(state => state.profile);
    return (
        <div className='Profile__Content'>
            <div className='flex-wrapper'>
                <Container maxWidth="xl" sx={{mt: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Sort/>
                    </div>
                    <Grid
                        container
                        spacing={6}
                        columns={{xs: 1, sm: 4, md: 8, lg: 12, xl: 16}}
                    >
                        {isLoadingProfile ? (
                            Array(8).fill(0).map((post, index) => (
                                <Grid key={index} item
                                      xs={1}
                                      sm={4}
                                      md={4}
                                      lg={4}
                                      xl={4}
                                >
                                    <SkeletonArt/>
                                </Grid>
                            ))
                        ) : (userCollectionForGuest.length > 0 && userCollectionForGuest.map((post, index: number) => (
                            <Grid key={post.post.id + '_' + index} item
                                  xs={1}
                                  sm={4}
                                  md={4}
                                  lg={4}
                                  xl={4}
                            >
                                <Suspense fallback={<SkeletonArt/>}>
                                    <Art
                                        art={post.post}
                                    />
                                </Suspense>
                            </Grid>
                        )))
                        }
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default ProfileGuestCollection;