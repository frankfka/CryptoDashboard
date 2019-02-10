import React, { Component } from 'react';
import TopTable from './market_overview/TopTable'
import MoversTable from './market_overview/MoversTable'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        data: null
    };
  }

  componentDidMount() {

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

  render() {
    if(this.state.data) {

      let topChartsData = this.state.data
      // Slice to create a new array
      let sortedBy24HrPrice = topChartsData.slice().sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR < b.RAW.USD.CHANGEPCT24HOUR)

      let topTen = topChartsData.slice(0, 10)
      let topTenGainers = sortedBy24HrPrice.slice(0, 10)
      let topTenLosers = sortedBy24HrPrice.slice(-10).reverse()

      return (
        <div className="App">
          <h1>
            Crypto Dashboard
          </h1>
          
          <TopTable data={topTen}/>
          <MoversTable data={topTenGainers}/>
          <MoversTable data={topTenLosers}/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>
            Loading
          </h1>
        </div>
      )
    }
    
  }
}

export default App;
