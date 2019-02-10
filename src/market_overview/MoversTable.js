import React, { Component } from 'react';

class MoversTable extends Component {

  render() {
    let data = this.props.data
    if (data) {
      return (
        <table className="top_charts">
        <tbody>{data.map(function(item, key) {
               
                 return (
                    <tr key = {key}>
                        <td>{item.CoinInfo.Name}</td>
                        <td>{item.DISPLAY.USD.CHANGEPCT24HOUR} %</td>
                    </tr>
                  )
               
               })}</tbody>
         </table>
      )
    } else {
      return null
    }
  }
}

export default MoversTable;
