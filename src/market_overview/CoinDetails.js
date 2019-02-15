import React, { Component } from 'react';

class CoinDetails extends Component {

  render() {
    let ticker = this.props.ticker
    if (ticker) {
      return (

        <div className="coin-details-wrapper">
            <h2>{ticker.CoinInfo.FullName} | {ticker.CoinInfo.Name}</h2>
            <h4>{ticker.DISPLAY.USD.PRICE}</h4>
        

        </div>

      )
    } else {
      return <h1>No Data Given</h1>
    }
  }
}

export default CoinDetails