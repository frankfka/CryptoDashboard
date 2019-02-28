import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import TablePaginationActionsWrapped from '../../util/TablePaginationActions'
import SortTableHeader from '../../util/SortTableHeader'

const ROWS_PER_PAGE = 10

class Holdings extends Component {

    state = {
        page: 0,
        orderBy: 'balance',
        order: 'desc',
    };

    // This gets called by the pagination class (passed as a prop)
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    // This gets called by the sorting table header (passed as a prop)
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        // Also reset page
        this.setState({ order, orderBy, page:0 });
    };

    // Sort method
    getSortingFunction = (orderBy) => {
        if (orderBy === 'ticker') {
            return function(a,b) {
                if (a.asset > b.asset) return 1
                else return -1
            }
        } else if (orderBy === 'balance') {
            return function(a,b) {
                if (parseFloat(a.free) > parseFloat(b.free)) return 1
                else return -1 
            }
        }
    }

    render() {

        let data = this.props.data

        // Only load table if data is available
        if (data) {
            // Get current state
            const { order, orderBy, page } = this.state;
            // Binance returns zero values within the data
            let holdings = data.balances.filter((currency) => {
                return parseFloat(currency.free) !== 0.0
            })
            // Sort 
            holdings = holdings.sort(this.getSortingFunction(orderBy))
            if (order === 'desc') {
                holdings = holdings.reverse() 
            }
            // # of empty rows to populate
            const numEmptyRows = ROWS_PER_PAGE - Math.min(ROWS_PER_PAGE, holdings.length - page * ROWS_PER_PAGE)
            // Define the headers of the table
            const tableHeaders = [
                { id: 'ticker', numeric: false, label: 'Ticker' },
                { id: 'balance', numeric: true, label: 'Balance' },
            ]
            const numCols = tableHeaders.count
            return (
                <Table className="holdings-table">
                    <SortTableHeader
                        headers={tableHeaders}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                    />

                    <TableBody>
                        {holdings.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE).map((currency, index) => (

                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{currency.asset}</TableCell>
                                <TableCell>{currency.free}</TableCell>
                            </TableRow>

                        ))}

                        {/* If empty rows needed, populate them */}
                        {numEmptyRows > 0 && (
                            <TableRow style={{ height: 49 * numEmptyRows }}>
                                <TableCell colSpan={numCols} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={numCols}
                                count={holdings.length}
                                rowsPerPageOptions={[ROWS_PER_PAGE]}
                                rowsPerPage={ROWS_PER_PAGE}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                ActionsComponent={TablePaginationActionsWrapped}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>

            )
        } else {
            // If no data loaded, return an empty div
            return null
        }
    }
}

export default Holdings