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
const ASC = 'asc'
const DESC = 'desc'
const TICKER_COL_ID = 'ticker'
const BALANCE_COL_ID = 'balance'
const BTC_VAL_COL_ID = 'val_btc'
const USD_VAL_COL_ID = 'val_usd'
// Define the headers of the table
const TABLE_HEADERS = [
    { id: TICKER_COL_ID, label: 'Ticker' },
    { id: BALANCE_COL_ID, label: 'Balance' },
    { id: BTC_VAL_COL_ID, label: 'Value (BTC)' },
    { id: USD_VAL_COL_ID, label: 'Value (USD)' },
]
const NUM_COLS = TABLE_HEADERS.count

class Holdings extends Component {

    state = {
        page: 0,
        orderBy: TICKER_COL_ID,
        order: ASC,
    };

    // This gets called by the pagination class (passed as a prop)
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    // This gets called by the sorting table header (passed as a prop)
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = DESC;
        if (this.state.orderBy === property && this.state.order === DESC) {
            order = ASC;
        }
        // Also reset page
        this.setState({ order, orderBy, page: 0 });
    };

    // Sort method defined for each column
    getSortingFunction = (orderBy) => {
        if (orderBy === BALANCE_COL_ID) {
            return (a, b) => {
                if (a.amount > b.amount) return 1
                else return -1
            }
        } else if (orderBy === TICKER_COL_ID) {
            // For ticker, use the standard string sort method
            return (a, b) => {
                if (a.ticker.toLowerCase() > b.ticker.toLowerCase()) return 1
                else return -1
            }
        } else if (orderBy === BTC_VAL_COL_ID) {
            return (a, b) => {
                if (a.btcVal > b.btcVal) return 1
                else return -1
            }
        } else if (orderBy === USD_VAL_COL_ID) {
            return (a, b) => {
                if (a.usdVal > b.usdVal) return 1
                else return -1
            }
        }
    }

    render() {

        let holdings = this.props.holdings

        // Only load table if data is available
        if (holdings) {
            // Get current state
            const { order, orderBy, page } = this.state;

            // Get sorting function & just reverse sorted array if we want it in desc order
            holdings = holdings.sort(this.getSortingFunction(orderBy))
            if (order === 'desc') {
                holdings = holdings.reverse()
            }
            // # of empty rows to populate
            const numEmptyRows = ROWS_PER_PAGE - Math.min(ROWS_PER_PAGE, holdings.length - page * ROWS_PER_PAGE)

            // Views to return
            return (
                <Table className="holdings-table">

                    {/* Header with sort function */}
                    <SortTableHeader
                        headers={TABLE_HEADERS}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                    />

                    {/* Rows populated by each holding */}
                    <TableBody>
                        {holdings.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE).map((holding, index) => (

                            <TableRow key={index}>
                                <TableCell>{holding.ticker}</TableCell>
                                <TableCell>{holding.amount.toFixed(4)}</TableCell>
                                <TableCell>
                                    {holding.btcVal > Math.pow(10, -5) ? 
                                    holding.btcVal.toFixed(5) : `${(holding.btcVal * Math.pow(10, 8)).toFixed(0)} sats` }
                                </TableCell>
                                <TableCell>{`$ ${holding.usdVal.toFixed(2)}`}</TableCell>
                            </TableRow>

                        ))}

                        {/* If empty rows needed, populate them */}
                        {numEmptyRows > 0 && (
                            <TableRow style={{ height: 49 * numEmptyRows }}>
                                <TableCell colSpan={NUM_COLS} />
                            </TableRow>
                        )}
                    </TableBody>

                    {/* The Footer has Pagination */}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={NUM_COLS}
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
            return null 
        }
    }
}

export default Holdings