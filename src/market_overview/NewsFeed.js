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
                      <p><Moment format="MMM DD YYYY">{newsItem.published_at}</Moment> | {newsItem.source.title}</p>
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
      return <h1>Loading</h1>
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  // Pull data for ticker
  fetchData = () => {

    // TODO cross-env doesn't accept more than 1 environment variable
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