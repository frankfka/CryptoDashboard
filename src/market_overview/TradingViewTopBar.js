import React, { Component } from 'react';

class TradingViewTopBar extends Component {

  render() {
    return (
      <div></div>
    )
  }
  // componentDidMount() {
  //   var aScript = document.createElement('script');
  //   aScript.type = 'text/javascript';
  //   aScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";

  //   document.head.appendChild(aScript);
  //   aScript.onload = function() {
  //       document.querySelector(".test").InnerHTML = {"symbols": [
  //         {
  //         "description": "",
  //         "proName": "COINBASE:BTCUSD"
  //         },
  //         {
  //         "description": "",
  //         "proName": "COINBASE:ETHUSD"
  //         },
  //         {
  //         "description": "",
  //         "proName": "BITFINEX:XRPUSD"
  //         },
  //         {
  //         "description": "",
  //         "proName": "COINBASE:LTCUSD"
  //         }
  //     ],
  //     "locale": "en"}
  //   };
  // }

}

export default TradingViewTopBar