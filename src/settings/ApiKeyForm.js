import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

import './css/api_key_form.css'

class ApiKeyForm extends Component {

    // TODO we can prepopulate from current local storage

    state = {
        "cryptocompareKey": null,
        "binanceKey": null,
        "binanceSecret": null
    }

    // Form methods
    onFieldChanged = (event, stateKey) => {
        this.setState({
            [stateKey]: event.target.value
        })
    };

    // Parent callback is a function passed in as a prop to notify the main App to reload
    onFormSubmission = (event, parentCallback) => {
        // TODO we need more validation
        event.preventDefault()
        if (this.state.cryptocompareKey && this.state.binanceKey && this.state.binanceSecret) {
            parentCallback(this.state)
        }
    };

    render() {
        return (

            <form className="api-key-form-container">

                <h4>Please create and enter the following API keys to use the dashboard.</h4>
                <p>Sign up directly at <a href="https://min-api.cryptocompare.com/pricing" target="_blank" rel="noopener noreferrer">CryptoCompare</a> for their free API 
                services. These keys will be stored in your browser &amp; will not be shared. Binance READ-ONLY 
                key &amp; secret are also required for portfolio analysis</p>

                <div>
                <TextField
                id="cryptocompare"
                label="CryptoCompare Key"
                placeholder="Enter Your API Key"
                className="api-form-field"
                margin="normal"
                variant="outlined"
                onChange={(e) => {this.onFieldChanged(e, "cryptocompareKey")}}
                />
                </div>

                <div>
                <TextField
                id="binance-key"
                label="Binance Key"
                placeholder="Enter Your API Key"
                className="api-form-field"
                margin="normal"
                variant="outlined"
                onChange={(e) => {this.onFieldChanged(e, "binanceKey")}}
                />
                </div>

                <div>
                <TextField
                id="binance-secret"
                label="Binance Secret"
                placeholder="Enter Your API Secret"
                className="api-form-field"
                margin="normal"
                variant="outlined"
                onChange={(e) => {this.onFieldChanged(e, "binanceSecret")}}
                />
                </div>

                <div>
                <Button variant="contained" color="primary" className="api-form-submit"
                        onClick={(e) => this.onFormSubmission(e, this.props.newKeysEntered)}>
                    Submit
                </Button>
                </div>

            </form>

        )
    }

}

export default withStyles({})(ApiKeyForm);