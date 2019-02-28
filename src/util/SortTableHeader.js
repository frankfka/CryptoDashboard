import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
import TableSortLabel from '@material-ui/core/TableSortLabel'

/**
 * Component for Sortable Header
 */
class SortTableHeader extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };
    
      render() {
        const { order, orderBy, headers } = this.props;
    
        return (
          <TableHead>
            <TableRow>
              {headers.map(
                header => (
                  <TableCell
                    key={header.id}
                    sortDirection={orderBy === header.id ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement='bottom-end'
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === header.id}
                        direction={order}
                        onClick={this.createSortHandler(header.id)}
                      >
                        {header.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ),
                this,
              )}
            </TableRow>
          </TableHead>
        );
      }
  }
  
  // Exported pagination with styles from theme
  export default withStyles({}, { withTheme: true })(
    SortTableHeader,
  );