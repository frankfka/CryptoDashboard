import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class MoversTable extends Component {

  render() {
    let data = this.props.data
    if (data) {

      let header;
      if(this.props.showHeaders) {
        header = <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24 Hr Change (%)</TableCell>
          </TableRow>
        </TableHead>;
      }

      console.log(header)
      return (
        <Table className="top-charts-table">

            {header}

            <TableBody>

              {data.map( (ticker, index) => (

                <TableRow key={ticker.CoinInfo.Name} >
                  <TableCell component="th" scope="row">{ticker.CoinInfo.Name}</TableCell>
                  <TableCell>{ticker.CoinInfo.FullName}</TableCell>
                  <TableCell>{ticker.DISPLAY.USD.PRICE}</TableCell>
                  <TableCell><span className={ticker.RAW.USD.CHANGEPCT24HOUR > 0 ? "green_text" : "red_text"}>{`${ticker.DISPLAY.USD.CHANGEPCT24HOUR} %`}</span></TableCell>
                </TableRow>

              ))}
            </TableBody>
          </Table>
      )
    } else {
      return null
    }
  }
}

export default MoversTable;
