import React, { Component } from 'react';
import './css/latest_activity.css'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import MoversTable from './components/MoversTable';

class TopTenOverview extends Component {

  render() {

    return (

      <div className="content-box">
        <Row>
          <Col xs="6">
            <div className="latest-charts-container">
              <h4>Top Gainers</h4>
              <MoversTable
                  showHeaders={true}
                  data={this.props.topGainers}
              />
            </div>
          </Col>
          <Col xs="6">
            <div className="latest-charts-container">
              <h4>Top Losers</h4>
              <MoversTable
                showHeaders={true}
                data={this.props.topLosers}
              />
            </div>
          </Col>
        </Row>
      </div>

    )
  }

}

export default TopTenOverview