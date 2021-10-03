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
                // Name of the slot
                root: {
                    // Some CSS
                    // fontSize: '1rem',
                    color: '#FFF'
                },
            },
        }
    },
});