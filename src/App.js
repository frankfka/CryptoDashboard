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
          "cryptopanic": null 
        }
    };
  }

  newKeysEntered = (keys) => {
    ls.set("cryptopanicKey", keys.cryptopanicKey)
    ls.set("cryptocompareKey", keys.cryptocompareKey)
    window.location.reload()
  };

  render() {

    // If keys are entered, go straight to dashboard
    if (this.state.keys.cryptocompare && this.state.keys.cryptocompare) {
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
    let cryptopanicKey = ls.get("cryptopanicKey")

    // If keys exist, then start pulling data
    if(cryptocompareKey && cryptopanicKey) {
      let keys = {
        "cryptocompare": cryptocompareKey,
        "cryptopanic": cryptopanicKey
      }
      this.setState({keys})
    }
  }

}

export default App 
