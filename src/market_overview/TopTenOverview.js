import React, { Component } from 'react';
import './css/top_ten_overview.css'

import TopTable from './TopTable';
import CoinDetails from './CoinDetails'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
  }

  render() {

    return (

      <div className="content-box">
        <Row>
          <Col xs="8">
            <TopTable 
              data={this.props.data} 
              rowClicked={this.tableRowClicked.bind(this)}
              selectedTicker={this.state.selectedTicker}
            />
          </Col>
          <Col xs="4">
            <CoinDetails
              ticker={this.state.selectedTicker ? this.state.selectedTicker : (this.props.data ? this.props.data[0] : null)}
            />
          </Col>
        </Row>
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