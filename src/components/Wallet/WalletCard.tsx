import React, {useState} from 'react';
import {ethers} from "ethers";
import {Button, Card, CardActions, CardContent, CardHeader, Container, Typography} from "@mui/material";
import {useActions} from "../../hooks/useActions";

interface walletInfo {
    addressAccount: null | string
    userBalance: null | string
    errorMessage: null | string
    button: string
}

const WalletCard = () => {
    const [walletInfo, setWalletInfo] = useState<walletInfo>({
        addressAccount: null,
        userBalance: null,
        errorMessage: '',
        button: 'Connect to wallet'
    })
    const {notificationToggle} = useActions()

    const ConnectWallet = () => {
        return async () => {
            if (window.ethereum) {
                await window.ethereum.request({method: 'eth_requestAccounts'})
                    .then((address: string) => {
                        window.ethereum.request({
                            method: 'eth_getBalance',
                            params: [address[0], 'latest']
                        }).then((res: any) => {
                            setWalletInfo({
                                ...walletInfo,
                                addressAccount: address[0],
                                userBalance: ethers.utils.formatEther(res)
                            })
                        })
                    })

            } else {
                notificationToggle({text: 'Install MetaMask', color: 'error', show: true})
            }
        }
    }

    return (
        <Container>
            <Card sx={{maxWidth: 345}}>
                <CardContent>
                    <Typography sx={{color: '#171719'}} variant='h6'>
                        Connecting MetaMask
                    </Typography>
                    <Typography variant="body2">
                        Address: {walletInfo.addressAccount}
                    </Typography>
                    <Typography variant="body2">
                        Balance: {walletInfo.userBalance}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant={"contained"} onClick={ConnectWallet()}>
                        Connect
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default WalletCard;