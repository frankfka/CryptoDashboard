import React, { Component } from 'react';
import './top_ten_overview.css'

import TopTable from './TopTable';
import CoinDetails from './CoinDetails'
import Grid from '@material-ui/core/Grid';

class TopTenOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTickeqr: null,
    };
  }

  tableRowClicked = (e, ticker) => {
    e.preventDefault()
    this.setState({selectedTicker: ticker})
    console.log(e);
    console.log(ticker);
  }

  render() {

    return (

      <div className="content-box">
        <Grid
        container direction="row"
        justify = "center"
        alignItems = "center">

          <Grid item xs={8}>
            <TopTable 
              data={this.props.data} 
              rowClicked={this.tableRowClicked.bind(this)}
              selectedTicker={this.state.selectedTicker}
            />
          </Grid>
          <Grid item xs>
            <CoinDetails
              ticker={this.state.selectedTicker}
            />
          </Grid>
          
        </Grid>
      </div>

    )
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({selectedTicker: this.props.data[0]})
    }
  }

}

export default TopTenOverview