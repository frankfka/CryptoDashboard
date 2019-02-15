import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class SimplePriceChart extends Component {

  render() {

    if(this.props.data) {
      const times = this.props.data.map(timePoint =>
        new Date(timePoint.time*1000)
      );
      const closePrices = this.props.data.map(timePoint => timePoint.close)
      const data = {
        labels: times,
        datasets: [
          {
            // label: 'My First dataset',
            // fill: false,
            // lineTension: 0.1,
            // backgroundColor: 'rgba(75,192,192,0.4)',
            // borderColor: 'rgba(75,192,192,1)',
            // borderCapStyle: 'butt',
            // borderDash: [],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'miter',
            // pointBorderColor: 'rgba(75,192,192,1)',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            // pointHoverBorderColor: 'rgba(220,220,220,1)',
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            data: closePrices,
            
          }
        ],
      }

      const options = {
        scales: {
          xAxes: [{
              type: 'time',
              time: {
                  unit: 'day'
              }
          }]
        }
      }
      
      return (
        <div className="simple-price-chart">
          <Line data={data} options={options}/>
        </div>
      )
    } else {
      return (
        <div className="simple-price-chart-error">
          <h2>Error loading data</h2>
        </div>
      )
    }
    
  }

}

export default SimplePriceChart