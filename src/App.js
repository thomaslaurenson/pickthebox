import React from 'react';
import axios from 'axios';

import { withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Switch,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  FormHelperText,
  Link,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'
import GitHubButton from 'react-github-btn'

const useStyles = () => ({
  root: {
    display: "flex",
    backgroundColor: "#141d2b",
    color: "#fff"
  },
  fontWhiteImportant: {
    color: "#fff !important",
  },
  fontWhite: {
    color: "#fff",
  },
  fullHeight: {
    minHeight: "100vh",
  },
  machineButton: {
    minWidth: "60%"
  },
  divider: {
    background: "#fff",
  },
  tableCell: {
    color: "#fff",
    borderBottom: "none",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // If the app is fetching JSON data
      loading: true,
      // All HTB machine data
      pickaboxData: null,
      // All HTB machine avatars in base64
      machineAvatars: null,
      // OSCP, OSCP Advanced, Retired, Recommended
      selections: [true, false, false, false],
      // Very Easy, Easy, Medium, Hard, Insane
      difficulty: [false, true, true, true, false],
      // Linux, Windows, Other
      os: [true, true, true],
      // The suggested box
      errorNoMachine: false,
      targetBox: null,
      targetBoxName: null,
      // Array of previously selected boxes
      cycledBoxes: [],
    }
  }

  async componentDidMount() {
    const URLs = ["pickabox_data.json", "machines_avatars.json"];
    const requests = URLs.map(URL => axios.get(URL).catch());

    try {
      const [pickaboxData, machineAvatars] = await axios.all(requests);
      this.setState({ pickaboxData: pickaboxData.data });
      this.setState({ machineAvatars: machineAvatars.data });
    }
    catch (err) {
      console.log(err.message);
    }
    this.setState({ loading: false });
  }

  handleSwitchChange = (event) => {
    let selections = [...this.state.selections];
    let entry = { ...selections[event.target.name] };
    entry = event.target.checked;
    selections[event.target.name] = entry;
    this.setState({ selections });
  }

  handleChangeOS = (event) => {
    let os = [...this.state.os];
    let entry = { ...os[event.target.name] };
    entry = event.target.checked;
    os[event.target.name] = entry;
    this.setState({ os });
  };

  handleChangeDifficulty = (event) => {
    let difficulty = [...this.state.difficulty];
    let entry = { ...difficulty[event.target.name] };
    entry = event.target.checked;
    difficulty[event.target.name] = entry;
    this.setState({ difficulty });
  };

  pickRandomBox() {
    let boxes = [...this.state.pickaboxData];

    // Remove previous seen boxes (state: cycledBoxes)
    // TODO: Add in history and the ability to reset

    // Operating system removal
    const toDeleteOS = new Set();
    if (!this.state.os[0]) { toDeleteOS.add("Linux") }
    if (!this.state.os[1]) { toDeleteOS.add("Windows") }
    if (!this.state.os[2]) { toDeleteOS.add("Other"); }
    boxes = boxes.filter(obj => !toDeleteOS.has(obj.os));

    // Operating system removal
    const toDeleteDifficulty = new Set();
    if (!this.state.difficulty[0]) { toDeleteDifficulty.add("Very Easy") }
    if (!this.state.difficulty[1]) { toDeleteDifficulty.add("Easy") }
    if (!this.state.difficulty[2]) { toDeleteDifficulty.add("Medium") }
    if (!this.state.difficulty[3]) { toDeleteDifficulty.add("Hard"); }
    if (!this.state.difficulty[4]) { toDeleteDifficulty.add("Insane"); }
    boxes = boxes.filter(obj => !toDeleteDifficulty.has(obj.difficulty));

    // OSCP removal
    if (this.state.selections[0]) {
      boxes = boxes.filter(obj => obj.oscp_normal !== false);
    }

    // OSCP Advanced removal
    if (this.state.selections[1]) {
      boxes = boxes.filter(obj => obj.oscp_advanced !== false);
    }

    // Retired removal
    if (this.state.selections[2]) {
      boxes = boxes.filter(obj => obj.retired !== false);
    }

    // Reccommended removal
    if (this.state.selections[3]) {
      boxes = boxes.filter(obj => obj.recommended !== false);
    }

    var randomBox = boxes[Math.floor(Math.random() * boxes.length)]

    if (!randomBox) {
      this.setState({ targetBox: null });
      this.setState({ errorNoMachine: true });
    } else {
      this.setState({ targetBox: randomBox });
      this.setState({ errorNoMachine: false });
    }
  }

  render() {
    const { classes } = this.props;
    const errorOS = this.state.os.filter((v) => v).length === 0;
    const errorDifficulty = this.state.difficulty.filter((v) => v).length === 0;

    if (this.state.loading) {
      return (
        <div className={classes.root}>
          <React.Fragment>
            <CssBaseline />
            <Grid container justifyContent="center" alignItems="center" className={classes.fullHeight}>
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
            <Container maxWidth="md" className={classes.fullHeight}>
              <Box display="flex" justifyContent="center" pt={3}>
                <Typography variant="h2" component="h2">
                  <Box fontWeight="fontWeightBold" m={1}>
                    Pick The Box
                  </Box>
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center" pt={3} pr={8} pl={8}>
                <Typography variant="body1" component="p">
                  This web app is a simple, 100% client-side application to help you pick a <Link href="https://www.hackthebox.eu" >Hack The Box</Link> machine based on your specified parameters! The <Link href="https://github.com/thomaslaurenson/pickthebox">source code is on GitHub</Link> if you want to review or submit a PR! If you want to support this project, a star on GitHub would be awesome! <GitHubButton href="https://github.com/thomaslaurenson/pickthebox" data-color-scheme="no-preference: light; light: light; dark: light;" data-icon="octicon-star" data-show-count="true" aria-label="Star thomaslaurenson/pickthebox on GitHub">Star</GitHubButton>
                </Typography>
              </Box>

              <Box pt={2}>
                <Divider className={classes.divider} />
              </Box>

              {/* Switches for machine selection */}
              <Box display="flex" justifyContent="center" ml={1} mr={1} p={1}>
                <Box m={1} p={1}>
                  <FormGroup row>
                    {["OSCP", "OSCP Advanced", "Retired", "Recommended"].map((title, index) => (
                      <FormControlLabel
                        key={index} control={<Switch checked={this.state.selections[index]} onChange={this.handleSwitchChange} name={index.toString()} color="primary" />}
                        label={title}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </Box>

              <Box display="flex" justifyContent="center"  >
                {/* Difficulty selection */}
                <Box m={1} p={1}>
                  <FormControl required error={errorDifficulty} component="fieldset">
                    <FormLabel component="legend" className={classes.fontWhiteImportant}>Machine Difficulty</FormLabel>
                    <FormGroup>
                      {["Very Easy", "Easy", "Medium", "Hard", "Insane"].map((difficulty, index) => (
                        <FormControlLabel
                          key={index} control={<Checkbox checked={this.state.difficulty[index]} onChange={this.handleChangeDifficulty} name={index.toString()} color="primary" />}
                          label={difficulty}
                        />
                      ))}
                    </FormGroup>
                    <FormHelperText className={classes.fontWhite}>You must select at least one!</FormHelperText>
                  </FormControl>
                </Box>

                {/* Operating system selection */}
                <Box m={1} p={1}>
                  <FormControl required error={errorOS} component="fieldset">
                    <FormLabel component="legend" className={classes.fontWhiteImportant}>Operating System</FormLabel>
                    <FormGroup>
                      {["Linux", "Windows", "Other"].map((os, index) => (
                        <FormControlLabel
                          key={index} control={<Checkbox checked={this.state.os[index]} onChange={this.handleChangeOS} name={index.toString()} color="primary" />}
                          label={os}
                        />
                      ))}
                    </FormGroup>
                    <FormHelperText className={classes.fontWhite}>You must select at least one!</FormHelperText>
                  </FormControl>
                </Box>
              </Box>

              <Box display="flex" justifyContent="center" ml={5} mr={5} >
                <Button className={classes.machineButton} variant="contained" color="primary" size="large" onClick={() => this.pickRandomBox()}>
                  Pick The Box
                </Button>
              </Box>

              <Box pt={4} pb={3}>
                <Divider className={classes.divider} />
              </Box>

              {/* Error panel */}
              {this.state.errorNoMachine ? (
                <Box display="flex" justifyContent="center" m={2} p={2}>
                  <Typography variant="h4" component="h2" >
                    <Box fontWeight="fontWeightBold" m={1}>
                      Error: No machine found using those specifications!
                    </Box>
                  </Typography>
                </Box>
              ) : ("")}

              {/* Target Box Information */}
              {this.state.targetBox ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>

                    <Typography variant="h4" component="h2">
                      <Box display="flex" justifyContent="center" fontWeight="fontWeightBold" m={1}>
                        {this.state.targetBox["name"]}
                      </Box>
                    </Typography>

                    <TableContainer >
                      <Table aria-label="target machine">
                        <TableBody>
                          <TableRow key="os" >
                            <TableCell component="th" scope="row" align="right" className={classes.tableCell}>Operating System:</TableCell>
                            <TableCell align="left" className={classes.tableCell}>{this.state.targetBox["os"]}</TableCell>
                          </TableRow>
                          <TableRow key="difficulty" >
                            <TableCell component="th" scope="row" align="right" className={classes.tableCell}>Difficulty:</TableCell>
                            <TableCell align="left" className={classes.tableCell}>{this.state.targetBox["difficulty"]}</TableCell>
                          </TableRow>
                          <TableRow key="release">
                            <TableCell component="th" scope="row" align="right" className={classes.tableCell}>Release:</TableCell>
                            <TableCell align="left" className={classes.tableCell}>{this.state.targetBox["release"]}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" justifyContent="center" alignItems="center" m={1}>
                      <img
                        alt={`Icon for ${this.state.targetBox["name"]}`}
                        src={`data:image/png;base64,${this.state.machineAvatars[this.state.targetBox["id"]]}`}
                      />
                    </Box>


                  </Grid>
                </Grid>
              ) : ("")}

            </Container>
          </React.Fragment>
        </div >
      );
    }
  }
}

export default withStyles(useStyles, { withTheme: true })(App);
