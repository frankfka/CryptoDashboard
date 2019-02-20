import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import TablePaginationActionsWrapped from '../../util/TablePaginationActions'

const CRYPTOCOMPARE_ROOT_URL = "https://www.cryptocompare.com/"
const ROWS_PER_PAGE = 10

class TopTable extends Component {

  state = {
    page: 0
  };

  // This gets called by the pagination class (passed as a prop)
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {

    let data = this.props.data

    // Only load table if data is available
    if (data) {
      let page = this.state.page
      return (
          <Table className="top-charts-table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Ticker</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price (USD)</TableCell>
                <TableCell>24 Hr Change (%)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE).map( (ticker, index) => (

                <TableRow 
                  className="cursor-pointer" 
                  key={ticker.CoinInfo.Name} 
                  onClick={((e) => this.props.rowClicked(e, index + page*10))}
                  selected={index === (this.props.selectedTickerIndex - page*10)}
                >
                  <TableCell className="table-index-coln">{index + 1 + page*10}</TableCell>
                  <TableCell component="th" scope="row">
                    <img className="ticker-img" src={CRYPTOCOMPARE_ROOT_URL+ticker.CoinInfo.ImageUrl} alt={ticker.CoinInfo.Name}/>&nbsp;&nbsp;{ticker.CoinInfo.Name}
                  </TableCell>
                  <TableCell>{ticker.CoinInfo.FullName}</TableCell>
                  <TableCell>{ticker.DISPLAY.USD.PRICE}</TableCell>
                  <TableCell><span className={ticker.RAW.USD.CHANGEPCT24HOUR > 0 ? "green_text" : "red_text"}>{`${ticker.DISPLAY.USD.CHANGEPCT24HOUR} %`}</span></TableCell>
                </TableRow>

              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                  <TablePagination
                    colSpan={5}
                    count={data.length}
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

export default TopTable