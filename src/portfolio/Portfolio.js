import React, { Component } from 'react'

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
        return (
            <div></div>
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
    }

    componentDidMount() {
        this.fetchData()
    }
}

export default Portfolio 