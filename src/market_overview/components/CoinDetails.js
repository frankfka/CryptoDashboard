import React, { Component } from 'react';
import './css/coin_details.css'
import SimplePriceChart from '../../util/SimplePriceChart'

class CoinDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      chartIsLoaded: false,
      chartData: null
    };
  }

  render() {

    let ticker = this.props.ticker
    // Only show details if a ticker is defined
    if (ticker) {
      let coinInfo = ticker.CoinInfo
      let displayUSD = ticker.DISPLAY.USD
      return (
        <div className="coin-details-wrapper">
          <h2>{coinInfo.FullName}</h2>
          <h4>{coinInfo.Name} | {displayUSD.PRICE}</h4>
          <div className="coin-details-section">
            <h3 className="coin-details-chart-heading">Chart</h3>
            <SimplePriceChart data={this.state.chartData}></SimplePriceChart>
          </div>

          <div className="coin-details-section">
            <h3 className="coin-details-details-heading">Details</h3>
            <p><span className="detail-label">Price:</span> <span>{displayUSD.PRICE}</span></p>
            <p><span className="detail-label">Market Cap:</span> <span>{displayUSD.MKTCAP}</span></p>
            <p><span className="detail-label">Change % (24hr):</span> <span>{displayUSD.CHANGEPCT24HOUR} %</span></p>
            <p><span className="detail-label">Volume (24hr):</span> <span>{displayUSD.TOTALVOLUME24HTO}</span></p>
            <p><span className="detail-label">Open (24hr):</span> <span>{displayUSD.OPEN24HOUR}</span></p>
            <p><span className="detail-label">High (24hr):</span> <span>{displayUSD.HIGH24HOUR}</span></p>
            <p><span className="detail-label">Low (24hr):</span> <span>{displayUSD.LOW24HOUR}</span></p>            
          </div>

        </div>

      )
    } else {
      return <h1>No Ticker Selected</h1>
    }
  }

  // Fetch data on new prop information
  componentDidUpdate(prevProps) {
    // Also checks if price is different (meaning the component should update its display)
    if ((prevProps.ticker.CoinInfo.Name !== this.props.ticker.CoinInfo.Name) || 
    (prevProps.ticker.DISPLAY.USD.PRICE !== this.props.ticker.DISPLAY.USD.PRICE)) {
      this.fetchData(this.props.ticker.CoinInfo.Name);
    }
  }
  
  // Fetch data when component mounts
  componentDidMount() {
    this.fetchData(this.props.ticker.CoinInfo.Name)
  }

  // Pull data for ticker
  fetchData = (tickerName) => {

    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${tickerName}&tsym=USD&limit=10`, {
      method: 'GET',
      headers: {
        'authorization': `Apikey ${process.env.CRYPTOCOMPARE_API_KEY}`
        },
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            chartIsLoaded: true,
            chartData: result.Data
          });
        },
        (error) => {
          this.setState({
            chartIsLoaded: true,
            error
          });
        }
      )

  }

}

export default CoinDetails