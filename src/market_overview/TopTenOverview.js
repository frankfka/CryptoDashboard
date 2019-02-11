import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TopTable from './TopTable';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  
});

class TopTenOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicker: null,
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

        <Grid item xs={12}>
            <TopTable 
                data={this.props.data} 
                rowClicked={this.tableRowClicked.bind(this)}
                selectedTicker={this.state.selectedTicker}
            />
        </Grid>
    )
  }
}

export default withStyles(styles)(TopTenOverview);