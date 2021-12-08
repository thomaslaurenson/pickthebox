import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#9fef00"
        },
        secondary: {
            main: "#ff0000"
        }
    },
    typography: {
        fontFamily: [
            "Roboto",
            "serif",
            "monospace",
        ].join(','),
    },
    components: {
        // Override color of tabs to select from List or Random
        MuiTab: {
            styleOverrides: {
                wrapper: {
                    color: "#fff",
                },
                root: {
                    background: "#1a2332",
                    "&:hover": {
                        backgroundColor: "#141d2b",
                    }
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    "&$focused": {
                        color: "#fff",
                    }
                }
            }
        },
    }
});

export default theme;
