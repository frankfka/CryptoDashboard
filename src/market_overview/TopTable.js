import React, { Component } from 'react';

class TopTable extends Component {

  render() {
    let data = this.props.data
    if (data) {
      return (
        <table className="top_charts">
        <tbody>{data.map(function(item, key) {
               
                 return (
                    <tr key = {key}>
                        <td>{item.CoinInfo.Name}</td>
                        <td>{item.CoinInfo.FullName}</td>
                        <td>{item.DISPLAY.USD.PRICE}</td>
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

export default TopTable;
