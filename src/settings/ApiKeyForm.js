import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ApiKeyForm extends Component {

    constructor(props) {
        super(props);
        this.inputNode = null 
      }

    onFormSubmission = (event, keys, callback) => {
        event.preventDefault()
        console.log(keys)
      };

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>CryptoCompare</Form.Label>
                    <Form.Control type="text" placeholder="Your API Key" />
                </Form.Group>
                <Form.Group inputRef={key => this.inputNode = key}>
                    <Form.Label>CryptoPanic</Form.Label>
                    <Form.Control type="text" placeholder="Your API Key" />
                </Form.Group>
                <Button variant="primary" type="submit"
                    onClick={(e) => this.onFormSubmission(e, this.inputNode, null)}>
                    Submit
                </Button>
            </Form>
        )
    }

}

export default ApiKeyForm