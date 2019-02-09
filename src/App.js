import React, { Component } from 'react';
import TopCharts from './market_overview/TopCharts'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  render() {
    return (
      <div className="App">
        <h1>
          Hello World
        </h1>
        <TopCharts/>
      </div>
    );
  }
}

export default App;
