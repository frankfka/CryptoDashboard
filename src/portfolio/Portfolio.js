import React, { Component } from 'react'

import Holdings from './components/Holdings'
import Spinner from 'react-spinkit'

class Portfolio extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            binanceHoldings: null
        }
    }

    /**
    * Render method
    */
    render() {
        if (this.state.binanceHoldings) {
            return (
                <div>
                    <div className="centered">
                        <h1>{`Total Value: $ ${this.getTotalPortfolioVal().toFixed(2)}`}</h1>
                    </div>
                    <div>
                        <Holdings holdings={this.state.binanceHoldings} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="loading-animation-container">
                <div className="loading-animation-main">
                    <Spinner name='double-bounce' color="orange"/>
                </div>
                </div>
            )
        }
    }

    /**
     * Pull required data for portfolio component
     */
    fetchData = () => {

        let binance_url = 'https://cryptodash-frankjia.herokuapp.com/binance/portfolio'
        binance_url = binance_url + `?key=${this.props.keys.binance.key}&secret=${this.props.keys.binance.secret}`

        // This gets a list of total balances from Binance
        fetch(binance_url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Binance Call Result")
                    console.log(result)
                    const balances = result

                    // This will fetch the conversion prices from CryptoCompare
                    if (balances) {
                        let prices_url = 'https://cryptodash-frankjia.herokuapp.com/cryptocompare/prices'
                        // Add auth
                        prices_url = prices_url + `?key=${this.props.keys.cryptocompare}`
                        // Now add the tickers
                        let holdings = Object.keys(balances)

                        prices_url = prices_url + `&tickers=${holdings.join()}`

                        fetch(prices_url)
                            .then(res => res.json())
                            .then(
                                (result) => {

                                    console.log("Fetched price conversions")
                                    console.log(result)

                                    // Construct complete ticker objects
                                    let holdings = []
                                    for (var ticker in balances) {
                                        const balance = balances[ticker]
                                        const conversion = result[ticker] // This might not exist if Cryptocompare has no data on this
                                        let btcConversion = 0, usdConversion = 0
                                        if (conversion) {
                                            btcConversion = conversion.BTC ? conversion.BTC : 0
                                            usdConversion = conversion.USD ? conversion.USD : 0
                                        }
                                        holdings.push({
                                            'ticker': ticker,
                                            'amount': balance,
                                            'btcVal': balance * btcConversion,
                                            'usdVal': balance * usdConversion
                                        })
                                    }

                                    console.log("Complete holdings")
                                    console.log(holdings)

                                    this.setState({
                                        isLoaded: true,
                                        binanceHoldings: holdings
                                    });
                                },
                                (error) => {
                                    this.setState({
                                        isLoaded: true,
                                        error
                                    })
                                })
                    }

                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })

    }

    componentDidMount() {
        this.fetchData()
    }

    // Helper function to get value of total portfolio
    getTotalPortfolioVal = () => {
        return this.state.binanceHoldings ?
        this.state.binanceHoldings.reduce((total, holding) => total + holding.usdVal, 0) : 0
    }

}

export default Portfolio 