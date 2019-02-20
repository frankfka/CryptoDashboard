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

                <div>
                <TextField
                id="cryptocompare"
                label="Cryptocompare Key"
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
                label="Cryptopanic Key"
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