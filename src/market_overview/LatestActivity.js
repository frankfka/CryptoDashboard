import React, { Component } from 'react';
import './css/top_ten_overview.css'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import MoversTable from './components/MoversTable';

class TopTenOverview extends Component {

  render() {

    return (

      <div className="content-box">
        <Row>
          <Col xs="6">
          <Row>
            <MoversTable
              showHeaders={true}
              data={this.props.topGainers}
            />
          </Row>
          <Row>
            <MoversTable
              showHeaders={false}
              data={this.props.topLosers}
            />
          </Row>
          </Col>
          <Col xs="6">
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