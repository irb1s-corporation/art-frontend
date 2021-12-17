import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbars = () => {
    const {show, text, color} = useTypedSelector(state => state.notification)
    const {notificationToggle} = useActions()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        notificationToggle({text: text, color: color, show: false});
    };
    const vertical = 'bottom';
    const horizontal = 'right'
    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar anchorOrigin={{vertical, horizontal}} open={show}
                      autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity={color} sx={{width: '100%'}}>
                    {text}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default Snackbars;