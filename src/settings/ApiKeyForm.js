import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

import './css/api_key_form.css'

class ApiKeyForm extends Component {

    state = {
        "cryptopanicKey": null,
        "cryptocompareKey": null,
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
        if (this.state.cryptopanicKey && this.state.cryptocompareKey) {
            parentCallback(this.state)
        }
    };

    render() {
        return (

            <form className="api-key-form-container">

                <h4>Please create and enter the following API keys to use the dashboard.</h4>
                <p>Sign up directly at <a href="https://min-api.cryptocompare.com/pricing" target="_blank" rel="noopener noreferrer">CryptoCompare</a> and <a href="https://cryptopanic.com/developers/api/" target="_blank" rel="noopener noreferrer">CryptoPanic</a> for their free API services. These keys will be stored in your browser &amp; will not be shared.</p>
                <p>Until a backend has been set up, you will need to <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/" target="_blank" rel="noopener noreferrer">disable CORS</a> in your browser for this to work.</p>

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
                id="cryptopanic"
                label="CryptoPanic Key"
                placeholder="Enter Your API Key"
                className="api-form-field"
                margin="normal"
                variant="outlined"
                onChange={(e) => {this.onFieldChanged(e, "cryptopanicKey")}}
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