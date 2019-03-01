import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { withTheme } from '@material-ui/core/styles';
import Spinner from 'react-spinkit'

class SimplePriceChart extends Component {

  render() {

    const primaryColor = this.props.theme.palette.primary.main;

    // Only load chart if data given, else just show a loading spinner
    if (this.props.data) {

      // Timepoint.time comes as UNIX values, convert to dates
      const times = this.props.data.map(timePoint =>
        new Date(timePoint.time * 1000)
      )

      // TODO should probably generalize this to accept any type of data
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

      // Options for the chart
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
              display: false
            },
            time: {
              unit: this.props.timePeriod
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              callback: function (value, index, values) {
                // Include a dollar sign in the ticks
                return '$ ' + value;
              }
            }
          }]
        }
      }

      // Render the chart view
      return (
        <div className="simple-price-chart">
          <Line data={data} options={options} />
        </div>
      )
    } else {
      return (
        <div>
          <Spinner name='double-bounce' color="orange" />
        </div>
      )
    }

  }

}

export default withTheme()(SimplePriceChart);