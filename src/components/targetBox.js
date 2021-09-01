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

const useStyles = () => ({
  tableCell: {
    color: "#fff",
    borderBottom: "none",
  },
});

class TargetBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
                        <TableCell component="th" scope="row" align="right" className={classes.tableCell}>Operating System:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{this.props.targetBox["os"]}</TableCell>
                      </TableRow>
                      <TableRow key="difficulty" >
                        <TableCell component="th" scope="row" align="right" className={classes.tableCell}>Difficulty:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{this.props.targetBox["difficulty"]}</TableCell>
                      </TableRow>
                      <TableRow key="release">
                        <TableCell component="th" scope="row" align="right" className={classes.tableCell}>Release:</TableCell>
                        <TableCell align="left" className={classes.tableCell}>{this.props.targetBox["release"]}</TableCell>
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
      </div >
    );
  }
}

export default withStyles(useStyles, { withTheme: true })(TargetBox);
