import React, { Component } from 'react'

import Holdings from './components/Holdings'

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null
        };
      }

    render() {
        console.log(this.state.data)
        return (
            <div>
                <Holdings data={this.state.data}/>
            </div>
        )
    }

    // Pull data from Binance
    fetchData = () => {

        let url = 'https://cryptodash-frankjia.herokuapp.com/binance/portfolio'
        url = url + `?key=${this.props.keys.binance.key}&secret=${this.props.keys.binance.secret}`

        fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result)
            this.setState({
            isLoaded: true,
            data: result
            });
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        )
    }

    componentDidMount() {
        this.fetchData()
    }
}

export default Portfolio 