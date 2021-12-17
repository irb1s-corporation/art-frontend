import React, {useState} from 'react';
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {IPosts} from "../../models/IPosts";
import Art from "../../components/Art/Art";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import SkeletonArt from "../../components/Art/SkeletonArt";

const Sort = React.memo(() => {
    const [sort, setSort] = useState('');
    const [open, setOpen] = useState(false);
    const {userPosts} = useTypedSelector(state => state.profile)
    const {setUserPosts} = useActions()
    const handleChange = (event: SelectChangeEvent<typeof sort>) => {
        setSort(event.target.value as string);
        switch (Number(event.target.value)) {
            case 10:
                return setUserPosts(
                    userPosts.sort((a, b) => {
                        if (a.createdAt > b.createdAt) {
                            return -1
                        } else {
                            return +1
                        }
                    })
                );
            case 20:
                return setUserPosts(
                    userPosts.sort((a, b) => {
                        if (a.createdAt < b.createdAt) {
                            return -1
                        } else {
                            return +1
                        }
                    })
                );
            case 30:
                return setUserPosts(userPosts.sort((a, b) => {
                    if (a.views && b.views) {
                        if (a.views.length > b.views.length) {
                            return -1
                        } else {
                            return +1
                        }
                    } else {
                        return -1
                    }
                }))
            case 40:
                return setUserPosts(userPosts.sort((a, b) => {
                    if (a.price < b.price) {
                        return -1
                    } else {
                        return +1
                    }
                }))
            case 50:
                return setUserPosts(userPosts.sort((a, b) => {
                    if (a.price > b.price) {
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

const ProfileSettings = () => {
    const {userPosts, isLoadingProfile} = useTypedSelector(state => state.profile)
    return (
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
                    ) : (
                        userPosts.length > 0 ? (userPosts.map((post: IPosts, index: number) => (
                                <Grid key={post.id + '_' + index} item
                                      xs={1}
                                      sm={4}
                                      md={4}
                                      lg={4}
                                      xl={4}
                                >
                                    <Art
                                        art={post}
                                    />
                                </Grid>
                            )))
                            : (
                                <Container>
                                    <div style={{
                                        margin: "15% 0",
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant='h4'>
                                            Нет артов 😕
                                        </Typography>
                                    </div>
                                </Container>
                            )
                    )}
                </Grid>
            </Container>
        </div>
    );
};

export default ProfileSettings;