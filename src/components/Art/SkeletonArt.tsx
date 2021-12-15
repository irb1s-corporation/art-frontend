import React from 'react';
import {Card, CardContent, CardHeader, Skeleton} from "@mui/material";

const SkeletonArt = () => {
    return (
        <Card className='Card'>
            <CardHeader
                className='Card__header'
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40}/>
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{marginBottom: 6}}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%"/>
                }
            />
            <Skeleton sx={{height: 350}} animation="wave" variant="rectangular"/>
            <CardContent>
            </CardContent>
        </Card>
    );
};

export default SkeletonArt;