import React, {useEffect} from 'react';

import {Container, Grid} from "@mui/material";
import {IPosts} from "../../models/IPosts";
import Art from "../../components/Art/Art";
import {useDispatch} from "react-redux";
import {ProfileActionCreators} from "../../store/reducers/profile/action-creators";
import {useTypedSelector} from "../../hooks/useTypedSelector";


const ProfileSettings = () => {
    const dispatch = useDispatch()
    const {token} = useTypedSelector(state => state.auth)
    const {userPosts} = useTypedSelector(state => state.profile)
    useEffect(() => {
        dispatch(ProfileActionCreators.getUserPosts(token))
    }, [dispatch, token])
    return (
        <div className='flex-wrapper'>
            <Container maxWidth="xl" sx={{mt: '20px'}}>
                <Grid
                    container
                    spacing={6}
                    columns={{xs: 1, sm: 4, md: 8, lg: 12, xl: 16}}
                >
                    {userPosts.map((post: IPosts, index: number) => (
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
                    ))
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default ProfileSettings;