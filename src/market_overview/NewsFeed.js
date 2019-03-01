import React, { Component } from 'react';
import Moment from 'react-moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import TablePaginationActionsWrapped from '../util/TablePaginationActions'

import './css/news_feed.css'

const ROWS_PER_PAGE = 5

class CoinDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null,
      page: 0
    };
  }

  // This gets called by the pagination class (passed as a prop)
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    
    // Loading animation 
    var Spinner = require('react-spinkit');  

    let data = this.state.data
    let page = this.state.page

    if (data) {

      return (

        <div className="content-box">
          <div className="news-feed-main-container">
            <h4>Latest News</h4> 
            <Table className="news-feed-table">
            <TableBody>
              {data.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE).map( (newsItem, index) => (
                <TableRow key={newsItem.id} >
                  <TableCell>
                    <div className="news-item">
                      <h5><a href={newsItem.url} target="_blank" rel="noopener noreferrer">{newsItem.title}</a></h5>
                      <p className="accent-text"><Moment format="LT | MMM DD YYYY">{newsItem.published_at}</Moment> | <span className="bolded">{newsItem.source.title}</span></p>
                    </div>   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                  <TablePagination
                    colSpan={1}
                    count={data.length}
                    rowsPerPageOptions={[ROWS_PER_PAGE]}
                    rowsPerPage={ROWS_PER_PAGE}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
              </TableRow>
            </TableFooter>
          </Table>
          </div>
        </div>
      )
    } else {
      return (
        <div className="content-box">
          <div className="loading-animation-content-container">
            <div className="loading-animation-news">
              <Spinner name='double-bounce' color="orange"/>
            </div>
          </div>
        </div>
        )
    }
  }

  componentDidMount() {
    this.fetchData()
    // Continue fetching every 5 min
    this.fetchInterval = setInterval(() => {
      this.fetchData()
    }, 300000) 
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
  }

  // Pull data for ticker
  fetchData = () => {

    fetch(`https://cryptodash-frankjia.herokuapp.com/cryptopanic/news?key=${this.props.auth}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.results
          });
          console.log("Cryptopanic Newsfeed")
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