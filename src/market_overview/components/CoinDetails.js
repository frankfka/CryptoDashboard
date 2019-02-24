import React, { Component } from 'react';
import './css/coin_details.css'
import SimplePriceChart from '../../util/SimplePriceChart'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from  'react-bootstrap/Button'

// For fetching data - consider passing some of these as props
const NUM_DAYS = 10
const NUM_MIN = 120
const NUM_HR = 48

const DAY_URL = 'https://cryptodash-frankjia.herokuapp.com/cryptocompare/histoday?'
const HOUR_URL = `https://cryptodash-frankjia.herokuapp.com/cryptocompare/histohour?`
const MIN_URL =  `https://cryptodash-frankjia.herokuapp.com/cryptocompare/histominute?`

const TIME_PERIOD_DAY = "day"
const TIME_PERIOD_HR = "hour"
const TIME_PERIOD_MIN = "minute"

class CoinDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      chartIsLoaded: false,
      chartData: null,
      timePeriod: TIME_PERIOD_DAY,
      chartTimePeriod: TIME_PERIOD_DAY // This is changed AFTER we load data to prevent axes from messing up
    };
  }

  timePeriodSelected = (e, newTimePeriod) => {
    e.preventDefault()
    this.setState({
      timePeriod: newTimePeriod
    })
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
            <div className="timeperiod-select">
              <ButtonGroup>
                <Button variant="outline-primary" active={this.state.timePeriod === TIME_PERIOD_DAY} onClick={(e) => {this.timePeriodSelected(e, TIME_PERIOD_DAY)}}>Day</Button>
                <Button variant="outline-primary" active={this.state.timePeriod === TIME_PERIOD_HR} onClick={(e) => {this.timePeriodSelected(e, TIME_PERIOD_HR)}}>Hour</Button>
                <Button variant="outline-primary" active={this.state.timePeriod === TIME_PERIOD_MIN} onClick={(e) => {this.timePeriodSelected(e, TIME_PERIOD_MIN)}}>Minute</Button>
              </ButtonGroup>
            </div>
            <SimplePriceChart data={this.state.chartData} timePeriod={this.state.chartTimePeriod}></SimplePriceChart>
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
  componentDidUpdate(prevProps, prevState) {
    // Also checks if price is different (meaning the component should update its display)
    if ((prevProps.ticker.CoinInfo.Name !== this.props.ticker.CoinInfo.Name) || 
    (prevProps.ticker.DISPLAY.USD.PRICE !== this.props.ticker.DISPLAY.USD.PRICE)) {
      this.fetchData();
    }
    // Check if timeperiod has changed
    if(prevState.timePeriod !== this.state.timePeriod) {
      this.fetchData();
    }
  }
  
  // Fetch data when component mounts
  componentDidMount() {
    this.fetchData()
  }

  // Pull data for ticker
  fetchData = () => {

    let ticker = this.props.ticker.CoinInfo.Name
    let timePeriod = this.state.timePeriod
    let limit 
    let url

    // Get appropriate URL depending on time period
    if(timePeriod === "day") {
      url = DAY_URL
      limit = NUM_DAYS
    } else if (timePeriod === "hour") {
      url = HOUR_URL
      limit = NUM_HR
    } else {
      // Default to minutes
      url = MIN_URL
      limit = NUM_MIN
    }
    // Add params
    url = url + `ticker=${ticker}&limit=${limit}&key=${this.props.auth}`

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            chartIsLoaded: true,
            chartData: result.Data,
            chartTimePeriod: timePeriod
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