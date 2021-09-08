import React from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"

const useStyles = () => ({
  root: {
    paddingBottom: "20px",
  },
  stripedRow: {
    backgroundColor: "#1a2332",
  }
});

class TargetBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>

        {/* Target Box Information */}
        {this.props.targetBox ? (
          <div>
            <Box pt={4} pb={3}>
              <Divider />
            </Box>

            <Grid container spacing={2} justifyContent="center" alignItems="center" className={classes.root}>

              {/* Machine avatar */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="center">
                  <img
                    alt={`Icon for ${this.props.targetBox["name"]}`}
                    src={`data:image/png;base64,${this.props.machineAvatars[this.props.targetBox["id"]]}`}
                  />
                </Box>
              </Grid>

              {/* Machine properties */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="center" pb={3}>
                  <TableContainer>
                    <Table aria-label="target machine">
                      <TableBody>
                        <TableRow key="name">
                          <TableCell colSpan={2} align="center"><Typography variant="h4" component="h2"><Box display="flex" fontWeight="fontWeightBold"></Box>{this.props.targetBox["name"]}</Typography></TableCell>
                        </TableRow>
                        <TableRow key="os" className={classes.stripedRow}>
                          <TableCell component="th" scope="row" align="right">OS:</TableCell>
                          <TableCell align="left">{this.props.targetBox["os"]}</TableCell>
                        </TableRow>
                        <TableRow key="difficulty">
                          <TableCell component="th" scope="row" align="right">Difficulty:</TableCell>
                          <TableCell align="left">{this.props.targetBox["difficulty"]}</TableCell>
                        </TableRow>
                        <TableRow key="release" className={classes.stripedRow}>
                          <TableCell component="th" scope="row" align="right">Release:</TableCell>
                          <TableCell align="left">{this.props.targetBox["release"]}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Grid>
          </div>
        ) : ("")}
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(TargetBox);
