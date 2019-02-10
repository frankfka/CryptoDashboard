import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class TopTable extends Component {

  render() {
    let data = this.props.data
    if (data) {
      return (

        <Paper className="top_charts">
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price (USD)</TableCell>
                <TableCell>24 Hr Change (%)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map(ticker => (
                <TableRow key={ticker.CoinInfo.Name}>
                  <TableCell component="th" scope="row">
                    {ticker.CoinInfo.Name}
                  </TableCell>
                  <TableCell>{ticker.CoinInfo.FullName}</TableCell>
                  <TableCell>{ticker.DISPLAY.USD.PRICE}</TableCell>
                  <TableCell><span className={ticker.RAW.USD.CHANGEPCT24HOUR > 0 ? "green_text" : "red_text"}>{`${ticker.DISPLAY.USD.CHANGEPCT24HOUR} %`}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

      )
    } else {
      return null
    }
  }
}

export default withStyles(styles)(TopTable);