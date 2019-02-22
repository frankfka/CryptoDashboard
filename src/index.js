import React from 'react';
import './index.css';
import { render } from 'react-dom';
import App from './App';
// import Portfolio from './portfolio/Portfolio'

// Themes
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: amber,
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
          'Roboto',
          'sans-serif',
        ].join(','),
    },
});

function RootApp() {
  return (
    <MuiThemeProvider theme={theme}>
    <App/>
      {/* <Portfolio /> */}
    </MuiThemeProvider>
  );
}

render(<RootApp />, document.querySelector('#root'));
