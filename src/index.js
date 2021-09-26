import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, adaptV4Theme, ThemeProvider } from "@mui/material";
import '@fontsource/roboto';

const theme = createTheme(adaptV4Theme({
  palette: {
    type: "dark",
    primary: {
      main: "#9fef00"
    },
    secondary: {
      main: "#ff0000"
    }
  },
  fontFamily: [
    "Roboto",
    "serif",
    "monospace",
  ].join(','),
  overrides: {
    MuiSwitch: {
      switchBase: {
        color: "#ccc",
      },
      track: {
        opacity: 0.2,
        backgroundColor: "#fff",
      }
    },
    MuiTab: {
      wrapper: {
        color: "#fff",
      },
      root: {
        background: "#1a2332",
        "&:hover": {
          backgroundColor: "#141d2b",
        }
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#fff",
      }
    },
    MuiFormLabel: {
      root: {
        color: "#fff",
        "&$focused": {
          color: "#fff",
        }
      }
    },
    MuiFormHelperText: {
      root: {
        color: "#141d2b",
      }
    },
    MuiCheckbox: {
      root: {
        color: "#fff",
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
        padding: "8px",
        fontFamily: "monospace",
      },
      body: {
        color: "#fff",
      }
    },
    MuiDataGrid: {
      root: {
        color: "#fff",
        border: "none",
      }
    },
    MuiSvgIcon: {
      root: {
        color: "#9fef00",
      }
    },
    MuiTablePagination: {
      caption: {
        color: "#9fef00",
      }
    },
  }
}));

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//ReactDOM.render(<App /></ThemeProvider>,document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
