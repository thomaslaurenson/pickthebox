import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@material-ui/core";
import '@fontsource/roboto';

const theme = createTheme({
  palette: {
    primary: {
      main: "#9fef00"
    },
    secondary: {
      main: "#ff0000"
    }
  },
  fontFamily: [
    'Roboto',
    'serif',
  ].join(','),
  overrides: {
    MuiSwitch: {
      switchBase: {
        color: "#ccc",
      },
      track: {
        opacity: 0.2,
        backgroundColor: "#fff",
        "$checked$checked + &": {
          opacity: 0.2,
          backgroundColor: "#ccc"
        }
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//ReactDOM.render(<App /></ThemeProvider>,document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
