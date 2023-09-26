import {createTheme} from '@mui/material/styles';
import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/400.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9fef00',
    },
    secondary: {
      main: '#ff0000',
    },
  },
  typography: {
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 400,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'Montserrat',
      },
    },
    // Override color of tabs to select from List or Random
    MuiTab: {
      styleOverrides: {
        wrapper: {
          color: '#fff',
        },
        root: {
          'background': '#1a2332',
          '&:hover': {
            backgroundColor: '#141d2b',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          'color': '#fff',
          '&$focused': {
            color: '#fff',
          },
        },
      },
    },
  },
});

export default theme;
