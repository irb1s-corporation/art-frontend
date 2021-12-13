import React, {FC} from 'react';
import {Button, Container, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShareIcon from '@mui/icons-material/Share';
const ArtPage: FC = () => {
    return (
        <div className='ArtPage'>
            <Container maxWidth="xl">
                <div className="flex-wrapper">
                    <div className='summary'>
                        <article className='card-image'>
                            <img alt={'image'}
                                 src={'http://localhost:5000/posts/1f15deb4-8675-4f29-bad0-0ce1bad96591.jpg'}/>
                        </article>
                    </div>
                    <div className='main'>
                        <div className='main__header'>
                            <section className='art-header'>
                                <div className='info'>
                                    <Typography variant='h4'>Cat sad cat</Typography>
                                    <div className='description'>Aboboasdasboaodsadas</div>
                                </div>
                                <div className='actions'>
                                    <div className='action'>
                                        <ShareIcon/>
                                    </div>
                                </div>
                            </section>
                            <section className='art-counts'>
                                <div className='count'>
                                    <VisibilityIcon sx={{mr: '5px'}}/>
                                    <div>0 просмотра</div>
                                </div>
                                <div className='count likes'>
                                    <FavoriteIcon sx={{mr: '5px'}}/>
                                    <div>0 лайков</div>
                                </div>
                            </section>
                        </div>
                        <div className='main__footer'>
                            <section className='price'>
                                <Typography variant='h3'>1000 руб.</Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    <AccountBalanceWalletIcon sx={{color: "#FFF", mr: '5px'}}/>
                                    Купить
                                </Button>
                            </section>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ArtPage;