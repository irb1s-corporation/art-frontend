import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FBCB9C',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFF'
                },
                // text: {
                //     color: '#171719'
                // }
            },
        }
    },
});