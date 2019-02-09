import React, { Component } from 'react';

class TopCharts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        items: []
    };
  }

  componentDidMount() {

    fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`, {
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
            items: [result.Data[0].CoinInfo.Algorithm]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="top_charts">
        <p>
          {this.state.items}
        </p>
      </div>
    );
  }
}

export default TopCharts;
