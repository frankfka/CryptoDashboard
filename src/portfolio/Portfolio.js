import React, { Component } from 'react'

import Holdings from './components/Holdings'

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
        return (
            <div>
                <Holdings holdings={this.state.binanceHoldings}/>
            </div>
        )
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
                                    for(var ticker in balances) {
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
}

export default Portfolio 