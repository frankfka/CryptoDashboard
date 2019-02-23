import React, { Component } from 'react';
import TopTenOverview from './TopTenOverview'
import LatestActivity from './LatestActivity'
import NewsFeed from './NewsFeed'

import './css/market_overview.css'

class MarketOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
    }

    render() {

        // Loading animation 
        var Spinner = require('react-spinkit');  
        let topChartsData = this.state.data

        // Wait for data to be passed in
        if(topChartsData) {

        // Slice to create a new array
        // Get largest movers
        let sortedBy24HrPrice = topChartsData.slice().sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR < b.RAW.USD.CHANGEPCT24HOUR)
        let topTenGainers = sortedBy24HrPrice.slice(0, 10)
        let topTenLosers = sortedBy24HrPrice.slice(-10).reverse()

        return (
            <div className="market_overview">
            
                <div className="mkt_overview_header">
                    <h1>
                    Market Overview
                    </h1>
                    <p>Reminder to disable CORS to load all modules!</p>
                </div>
                
                <div className="main_container">
                    <TopTenOverview data={topChartsData}/>
                </div>

                <div className="main_container">
                    <LatestActivity topGainers={topTenGainers} topLosers={topTenLosers}/>
                </div>

                <div className="main_container">
                    <NewsFeed auth={this.props.keys.cryptopanic}/>
                </div>

            </div>
        );
        } else {

            // If data isn't loaded, display a loading animation
            return (
                <div className="loading-animation-container">
                <div className="loading-animation-main">
                    <Spinner name='double-bounce' color="orange"/>
                </div>
                </div>
            )

        }
    }

    

    // Pull data (only from cryptocompare for now)
    fetchData = () => {

    fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`, {
        method: 'GET',
        headers: {
        'authorization': `Apikey ${this.props.keys.cryptocompare}`
        },
    })
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            this.setState({
            isLoaded: true,
            data: result.Data
            });
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        )
        
    }

    // This will grab all the data used to render the market overview
    componentDidMount() {

        this.fetchData();
        // Continue fetching every 5 min
        setInterval(() => {
        this.fetchData()
        }, 300000) 
    
    }

}

export default MarketOverview