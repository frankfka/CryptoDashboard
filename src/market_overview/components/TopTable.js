import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const cryptocompareRootURL = "https://www.cryptocompare.com/"

const actionsStyles = theme => ({});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const {count, page, rowsPerPage, theme } = this.props;

    return (
      <div className="table-pagination">
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

class TopTable extends Component {

  state = {
    page: 0
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {

    let data = this.props.data
    if (data) {

      const rowsPerPage = 10
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

              {data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map( (ticker, index) => (

                <TableRow 
                  className="cursor-pointer" 
                  key={ticker.CoinInfo.Name} 
                  onClick={((e) => this.props.rowClicked(e, ticker, index + page*10))}
                  selected={index === (this.props.selectedTickerIndex - page*10)}
                >
                  <TableCell className="table-index-coln">{index + 1 + page*10}</TableCell>
                  <TableCell component="th" scope="row">
                    <img className="ticker-img" src={cryptocompareRootURL+ticker.CoinInfo.ImageUrl} alt={ticker.CoinInfo.Name}/>&nbsp;&nbsp;{ticker.CoinInfo.Name}
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
                    rowsPerPage={10}
                    rowsPerPageOptions={[10]}
                    page={this.state.page}
                    SelectProps={{
                      native: true,
                    }}
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



export default TopTable