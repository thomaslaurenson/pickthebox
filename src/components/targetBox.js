import React from 'react';

import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

class TargetBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>

        {/* Target Box Information */}
        {this.props.targetBox ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>

              <Typography variant="h4" component="h2">
                <Box display="flex" justifyContent="center" fontWeight="fontWeightBold" m={1}>
                  {this.props.targetBox["name"]}
                </Box>
              </Typography>

              <TableContainer >
                <Table aria-label="target machine">
                  <TableBody>
                    <TableRow key="os" >
                      <TableCell component="th" scope="row" align="right">Operating System:</TableCell>
                      <TableCell align="left">{this.props.targetBox["os"]}</TableCell>
                    </TableRow>
                    <TableRow key="difficulty" >
                      <TableCell component="th" scope="row" align="right">Difficulty:</TableCell>
                      <TableCell align="left">{this.props.targetBox["difficulty"]}</TableCell>
                    </TableRow>
                    <TableRow key="release">
                      <TableCell component="th" scope="row" align="right">Release:</TableCell>
                      <TableCell align="left">{this.props.targetBox["release"]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center" alignItems="center" m={1}>
                <img
                  alt={`Icon for ${this.props.targetBox["name"]}`}
                  src={`data:image/png;base64,${this.props.machineAvatars[this.props.targetBox["id"]]}`}
                />
              </Box>


            </Grid>
          </Grid>
        ) : ("")}
      </React.Fragment>
    );
  }
}

export default withStyles({ withTheme: true })(TargetBox);
