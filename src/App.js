import React, { Component } from 'react'
import TopTenOverview from './market_overview/TopTenOverview'
import LatestActivity from './market_overview/LatestActivity'
import NewsFeed from './market_overview/NewsFeed'
import ls from 'local-storage'
import ApiKeyForm from './settings/ApiKeyForm';

// const cryptopanic_api_key = "2a9a268e94067b0fe98facdea4ed378a568832c3"
// const cryptocompare_api_key = "8088cea6635be8f020cd6673f2595803da16dae057a32b47683e12c337081751"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        data: null,
        keys: {
          "cryptocompare": null,
          "cryptopanic": null 
        }
    };
  }

  newKeysEntered = (keys) => {
    ls.set("cryptopanicKey", keys.cryptopanicKey)
    ls.set("cryptocompareKey", keys.cryptocompareKey)
    window.location.reload()
  };

  render() {

    // If keys are entered, go straight to dashboard
    if (this.state.keys.cryptocompare && this.state.keys.cryptocompare) {

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
                <NewsFeed auth={this.state.keys.cryptopanic}/>
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

    // No keys entered, render the input component
    else {
      return (
        <ApiKeyForm newKeysEntered={this.newKeysEntered}></ApiKeyForm>
      )
    }

  }

  // Pull data (only from cryptocompare for now)
  fetchData = () => {

    fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`, {
      method: 'GET',
      headers: {
        'authorization': `Apikey ${this.state.keys.cryptocompare}`
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

  // Initialize keys before component mounts
  componentWillMount() {

    let cryptocompareKey = ls.get("cryptocompareKey")
    let cryptopanicKey = ls.get("cryptopanicKey")

    // If keys exist, then start pulling data
    if(cryptocompareKey && cryptopanicKey) {
      let keys = {
        "cryptocompare": cryptocompareKey,
        "cryptopanic": cryptopanicKey
      }
      this.setState({keys})
  }
}

  // This will grab all the data used to render pages
  componentDidMount() {

    // If keys exist, then start pulling data
    if(this.state.keys.cryptocompare && this.state.keys.cryptocompare) {
      this.fetchData();
      // Continue fetching every 5 min
      setInterval(() => {
        this.fetchData()
      }, 300000) 
    }
  }

}

export default App 
