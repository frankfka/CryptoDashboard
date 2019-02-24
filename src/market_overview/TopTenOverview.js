import React, { Component } from 'react';
import './css/top_ten_overview.css'

import TopTable from './components/TopTable';
import CoinDetails from './components/CoinDetails'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class TopTenOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTickerIndex: 0,
    };
  }

  // Method to run when user clicks on a row
  // This is passed to TopTable
  tableRowClicked = (e, index) => {
    e.preventDefault()
    this.setState({
      selectedTickerIndex: index
    })
  }

  render() {

    return (

      <div className="content-box">
        <Row>
          <Col xs="8">
            <TopTable 
              data={this.props.data} 
              rowClicked={this.tableRowClicked.bind(this)}
              selectedTickerIndex={this.state.selectedTickerIndex}
            />
          </Col>
          <Col xs="4">
            <CoinDetails
              ticker={(this.props.data ? this.props.data[this.state.selectedTickerIndex] : null)}
              auth={this.props.auth}
            />
          </Col>
        </Row>
      </div>

    )
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({selectedTicker: this.props.data[this.state.selectedTickerIndex]})
    }
  }

  componentWillReceiveProps() {
    this.setState({
      selectedTicker: this.props.data[this.state.selectedTickerIndex]
    })
  }

}

export default TopTenOverview