import React, { Component } from 'react';

class CoinDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null
    };
  }

  render() {

    let data = this.state.data
    if (data) {

      return (

        <div className="news-feed-wrapper">
        </div>

      )
    } else {
      return <h1>Loading</h1>
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  // Pull data for ticker
  fetchData = () => {

    fetch(`https://cryptopanic.com/api/v1/posts/?auth_token=2a9a268e94067b0fe98facdea4ed378a568832c3&public=true`, {
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      crossDomain:true,
      method: 'GET'
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.Data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      console.log(this.state)

  }

}

export default CoinDetails