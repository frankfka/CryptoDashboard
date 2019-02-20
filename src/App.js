import React, { Component } from 'react'
import TopTenOverview from './market_overview/TopTenOverview'
import LatestActivity from './market_overview/LatestActivity'
import NewsFeed from './market_overview/NewsFeed'

class App extends Component {

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

    // Wait for data to load
    if(this.state.data) {

      let topChartsData = this.state.data
      // Slice to create a new array
      // Get largest movers
      let sortedBy24HrPrice = topChartsData.slice().sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR < b.RAW.USD.CHANGEPCT24HOUR)
      let topTenGainers = sortedBy24HrPrice.slice(0, 10)
      let topTenLosers = sortedBy24HrPrice.slice(-10).reverse()

      return (
        <div className="app">
        
          <h1>
            Crypto Dashboard
          </h1>
          
          <div className="main_container">
            <TopTenOverview data={topChartsData}/>
          </div>

          <div className="main_container">
            <LatestActivity topGainers={topTenGainers} topLosers={topTenLosers}/>
          </div>

          <div className="main_container">
            <NewsFeed/>
          </div>

        </div>
      );
      
    } else {

      // If data isn't loaded, display a loading animation
      return (
        <div className="loading-animation-container">
          <div className="loading-animation">
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
        'authorization': `Apikey ${process.env.CRYPTOCOMPARE_API_KEY}`
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

  // This will grab all the data used to render pages
  componentDidMount() {
    this.fetchData();

    // Continue fetching every 5 min
    setInterval(() => {
      this.fetchData()
    }, 300000) 
  }

}

export default App 
