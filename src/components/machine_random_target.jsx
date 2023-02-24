import React from 'react';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

class TargetBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        {/* Target Box Information */}
        {this.props.targetBox ? (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* Machine avatar */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <img
                  alt={`Icon for ${this.props.targetBox['name']}`}
                  src={`data:image/png;base64,${
                    this.props.machineAvatars[this.props.targetBox['id']]
                  }`}
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
                        <TableCell colSpan={2} align="center">
                          <Typography variant="h4" component="h2">
                            <Box
                              display="flex"
                              fontWeight="fontWeightBold"
                            ></Box>
                            {this.props.targetBox['name']}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow key="os" className={classes.stripedRow}> */}
                      <TableRow
                        key="os"
                        css={css`
                          backgroundcolor: #1a2332;
                        `}
                      >
                        <TableCell component="th" scope="row" align="right">
                          OS:
                        </TableCell>
                        <TableCell align="left">
                          {this.props.targetBox['os']}
                        </TableCell>
                      </TableRow>
                      <TableRow key="difficulty">
                        <TableCell component="th" scope="row" align="right">
                          Difficulty:
                        </TableCell>
                        <TableCell align="left">
                          {this.props.targetBox['difficulty']}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        key="release"
                        css={css`
                          backgroundcolor: #1a2332;
                        `}
                      >
                        <TableCell component="th" scope="row" align="right">
                          Release:
                        </TableCell>
                        <TableCell align="left">
                          {this.props.targetBox['release']}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

TargetBox.propTypes = {
  targetBox: PropTypes.object,
  machineAvatars: PropTypes.object,
};

export default TargetBox;
