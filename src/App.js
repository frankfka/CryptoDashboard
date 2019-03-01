import React, { Component } from 'react'
import Dashboard from './Dashboard'
import ls from 'local-storage'
import ApiKeyForm from './settings/ApiKeyForm';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        keys: {
          "cryptocompare": null,
          "binance": null,
        }
    };
  }

  newKeysEntered = (keys) => {
    ls.set("cryptocompareKey", keys.cryptocompareKey)
    ls.set("binanceKey", keys.binanceKey)
    ls.set("binanceSecret", keys.binanceSecret)
    window.location.reload()
  };

  render() {

    // If keys are entered, go straight to dashboard
    if (this.state.keys.cryptocompare && this.state.keys.binance) {
      // Load main app
      return (
        <Dashboard keys={this.state.keys}/>
      )
    }

    // No keys entered, render the input component
    else {
      return (
        <ApiKeyForm newKeysEntered={this.newKeysEntered}></ApiKeyForm>
      )
    }

  }

  // Initialize keys before component mounts
  componentWillMount() {

    let cryptocompareKey = ls.get("cryptocompareKey")
    let binanceKey = ls.get("binanceKey")
    let binanceSecret = ls.get("binanceSecret")

    // If keys exist, then start pulling data
    if(cryptocompareKey && binanceKey && binanceSecret) {
      let keys = {
        "cryptocompare": cryptocompareKey,
        "binance": {"key": binanceKey, "secret": binanceSecret}
      }
      this.setState({keys})
    }
  }

}

export default App 
