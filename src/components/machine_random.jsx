import React from "react";
import { css } from '@emotion/react';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Switch,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material"
import TargetMachine from "./machine_random_target"

class RandomMachines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    let boxes = [...this.props.machineData];

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
    const errorOS = this.state.os.filter((v) => v).length === 0;
    const errorDifficulty = this.state.difficulty.filter((v) => v).length === 0;

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">

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
                <FormLabel component="legend">Machine Difficulty</FormLabel>
                <FormGroup>
                  {["Very Easy", "Easy", "Medium", "Hard", "Insane"].map((difficulty, index) => (
                    <FormControlLabel
                      key={index} control={<Checkbox checked={this.state.difficulty[index]} onChange={this.handleChangeDifficulty} name={index.toString()} color="primary" />}
                      label={difficulty}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>You must select at least one!</FormHelperText>
              </FormControl>
            </Box>

            {/* Operating system selection */}
            <Box m={1} p={1}>
              <FormControl required error={errorOS} component="fieldset">
                <FormLabel component="legend">Operating System</FormLabel>
                <FormGroup>
                  {["Linux", "Windows", "Other"].map((os, index) => (
                    <FormControlLabel
                      key={index} control={<Checkbox checked={this.state.os[index]} onChange={this.handleChangeOS} name={index.toString()} color="primary" />}
                      label={os}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>You must select at least one!</FormHelperText>
              </FormControl>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" ml={5} mr={5} pb={4}>
            <Button css={css`minWidth: 60%;`} variant="contained" color="primary" size="large" onClick={() => this.pickRandomBox()}>
              Pick The Box
            </Button>
          </Box>

          {/* Error panel */}
          {this.state.errorNoMachine ? (
            <Box display="flex" justifyContent="center" m={2} p={2}>
              <Typography variant="h4" component="h2" color="error" align="center">
                <Box fontWeight="fontWeightBold" m={1}>
                  Error: No machine found using those specifications!
                </Box>
              </Typography>
            </Box>
          ) : ("")}

          <TargetMachine targetBox={this.state.targetBox} machineAvatars={this.props.machineAvatars} machineTypesIcons={this.props.machineTypesIcons} />

        </Container>
      </React.Fragment>
    );
  }
}

export default (RandomMachines);
