import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { withTheme } from '@material-ui/core/styles';

class SimplePriceChart extends Component {

  render() {

    const primaryColor = this.props.theme.palette.primary.main;
    console.log(this.props.timePeriod)

    if(this.props.data) {
      const times = this.props.data.map(timePoint =>
        new Date(timePoint.time*1000)
      );
      const closePrices = this.props.data.map(timePoint => timePoint.close)
      const data = {
        labels: times,
        datasets: [
          {
            borderColor: primaryColor,
            backgroundColor: '#FFFFFF',
            pointRadius: 0,
            data: closePrices,
          }
        ],
      }

      const options = {
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
              type: 'time',
              gridLines: {
                display:false
              },
              time: {
                  unit: this.props.timePeriod
              }
          }],
          yAxes: [{
            gridLines: {
              display:false
            },
            ticks: {
                callback: function(value, index, values) {
                    // Include a dollar sign in the ticks
                    return '$ ' + value;
                }
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

export default withTheme()(SimplePriceChart);