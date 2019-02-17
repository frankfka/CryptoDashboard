import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const cryptocompareRootURL = "https://www.cryptocompare.com/"

class TopTable extends Component {

  render() {
    let data = this.props.data
    if (data) {
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

              {data.map( (ticker, index) => (

                <TableRow 
                  className="cursor-pointer" 
                  key={ticker.CoinInfo.Name} 
                  onClick={((e) => this.props.rowClicked(e, ticker, index))}
                  selected={index === this.props.selectedTickerIndex}
                >
                  <TableCell className="table-index-coln">{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    <img className="ticker-img" src={cryptocompareRootURL+ticker.CoinInfo.ImageUrl} alt={ticker.CoinInfo.Name}/>&nbsp;&nbsp;{ticker.CoinInfo.Name}
                  </TableCell>
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

export default TopTable