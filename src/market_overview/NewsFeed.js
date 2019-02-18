import React, { Component } from 'react';
import Moment from 'react-moment';

import './css/news_feed.css'

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

        <div className="content-box">
          <div className="news-feed-main-container">
            <h4>Latest News</h4> 
            {data.map((newsItem, index) => (
              <div className="news-feed-item" key={index}>
                <h5><a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.title}</a></h5>
                <p><Moment format="MMM DD YYYY">{newsItem.published_at}</Moment> | {newsItem.source.title}</p>
              </div>
            ))}
          </div>
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
            data: result.results
          });
          console.log(result.results)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

}

export default CoinDetails