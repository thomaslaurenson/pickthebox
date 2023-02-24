import * as React from 'react';
import PropTypes from 'prop-types';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box} from '@mui/material';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    description: 'The machine name.',
    minWidth: 130,
    type: 'string',
    flex: 1,
  },
  {
    field: 'os',
    headerName: 'OS',
    description: 'The machine operating system.',
    minWidth: 120,
    type: 'string',
    flex: 1,
  },
  {
    field: 'difficulty',
    headerName: 'Difficulty',
    description: 'The machine difficulty.',
    minWidth: 140,
    type: 'string',
    flex: 1,
  },
  {
    field: 'release',
    headerName: 'Release',
    description: 'The machine release date.',
    minWidth: 130,
    type: 'dateTime',
    flex: 1,
  },
  {
    field: 'oscp_normal',
    headerName: 'OSCP',
    description: 'If the machine is on the NetSecFocus OSCP-like list.',
    minWidth: 145,
    type: 'boolean',
    flex: 1,
  },
  {
    field: 'oscp_advanced',
    headerName: 'OSCP Adv',
    description:
      'If the machine is on the Advanced NetSecFocus OSCP-like list.',
    minWidth: 145,
    type: 'boolean',
    flex: 1,
  },
  {
    field: 'retired',
    headerName: 'Retired',
    description: 'If the machine is retired.',
    minWidth: 145,
    type: 'boolean',
    flex: 1,
  },
  {
    field: 'recommended',
    headerName: 'Recommended',
    description: 'If the machine is recommended.',
    minWidth: 145,
    type: 'boolean',
    flex: 1,
  },
];

class DataGridDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={3}
        pb={3}
      >
        <div style={{height: '65vh', width: '100%'}}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            rows={this.props.machineData}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[20]}
            checkboxSelection={false}
          />
        </div>
      </Box>
    );
  }
}

DataGridDemo.propTypes = {
  machineData: PropTypes.object,
};

export default DataGridDemo;
