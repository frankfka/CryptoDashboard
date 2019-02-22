import React, { Component } from 'react'

// Test keys with empty account 
const binance_key = "5gy302GkdttwGRaR8VCe5ISkbfDYuGinajqzhcaCN9Oe5KWBtfxEknsehYN3PeVU"
const binance_secret = "E7cx329NgKvWxcKDcqWpocYLKrmBaLBjkqpdHiIq1t51HkIY2onRJqcqUwqYUFDn"
const binance_base_url = "https://api.binance.com"

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

    // Create all the signed stuff
    var CryptoJS = require("crypto-js");
    let queryString = `timestamp=${(new Date()).getTime()}`  //&recvWindow=100000`
    let signature = CryptoJS.HmacSHA256(queryString, binance_secret).toString()
    let completeURL = binance_base_url + `/api/v3/account?${queryString}&signature=${signature}`

    fetch(completeURL, {
        crossDomain:true,
        method: 'GET',
        headers: {
        'X-MBX-APIKEY': binance_key,
        'Access-Control-Allow-Origin':'*'
        },
    })
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