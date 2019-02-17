import React, { Component } from 'react';
import TopTenOverview from './market_overview/TopTenOverview'
import MoversTable from './market_overview/MoversTable'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

    // Wait for data to load
    if(this.state.data) {

      let topChartsData = this.state.data
      // Slice to create a new array
      let sortedBy24HrPrice = topChartsData.slice().sort((a, b) => a.RAW.USD.CHANGEPCT24HOUR < b.RAW.USD.CHANGEPCT24HOUR)
      let topTenGainers = sortedBy24HrPrice.slice(0, 10)
      let topTenLosers = sortedBy24HrPrice.slice(-10).reverse()

      return (
        <div className="app">
          <h1>
            Crypto Dashboard
          </h1>
          
          <div className="main_container">
            <Grid container spacing={24}>
              <TopTenOverview data={topChartsData.slice(0,10)}/>
            </Grid>
          </div>

          <MoversTable data={topTenGainers}/>
          <MoversTable data={topTenLosers}/>
        </div>
      );
    } else {
      return (
        <div className="loading">
          <h1>
            Loading
          </h1>
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
    setInterval(() => {
      this.fetchData()
      console.log("Fetching new data")
    }, 300000) // Fetch every 5 min
  }

}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(App);
