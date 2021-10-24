import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import {
  CssBaseline,
  Container,
  Grid,
  Box,
  CircularProgress,
  AppBar,
  Tabs,
  Tab,
} from "@mui/material"

import Header from "./components/header"
import RandomMachines from "./components/random"
import DataGridDemo from "./components/list"

const useStyles = () => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#141d2b",
  },
  machineButton: {
    minWidth: "60%"
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // If the app is fetching JSON data
      loading: true,
      // All HTB machine data
      machineData: null,
      // All HTB machine avatars in base64
      machineAvatars: null,
      // All HTB machine types (OS) avatars in base64
      machineTypesIcons: null,
      // Selected tab index
      value: 0,
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  async componentDidMount() {
    const URLs = ["machines_data.json", "machines_avatars.json", "machines_types.json"];
    const requests = URLs.map(URL => axios.get(URL).catch());

    try {
      const [machineData, machineAvatars, machineTypesIcons] = await axios.all(requests);
      this.setState({ machineData: machineData.data });
      this.setState({ machineAvatars: machineAvatars.data });
      this.setState({ machineTypesIcons: machineTypesIcons.data });
    }
    catch (err) {
      console.log(err.message);
    }
    this.setState({ loading: false });
  }

  render() {
    const { classes, theme } = this.props;

    if (this.state.loading) {
      return (
        <div className={classes.root}>
          <React.Fragment>
            <CssBaseline />
            <Grid container justifyContent="center" alignItems="center">
              <Box display="flex" >
                <CircularProgress />
              </Box>
            </Grid>
          </React.Fragment>
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <Header />

              <AppBar position="static">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="select from random or list"
                >
                  <Tab label="Random" {...a11yProps(0)} />
                  <Tab label="List" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={this.state.value} index={0} dir={theme.direction}>
                <RandomMachines machineData={this.state.machineData} machineAvatars={this.state.machineAvatars} machineTypesIcons={this.state.machineTypesIcons} />
              </TabPanel>
              <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                <DataGridDemo machineData={this.state.machineData} />
              </TabPanel>
            </Container>
          </React.Fragment>
        </div >
      );
    }
  }
}

export default withStyles(useStyles, { withTheme: true })(App);
