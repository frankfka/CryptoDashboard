import React, { Component } from 'react'

import { withTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MarketOverview from './market_overview/MarketOverview'
import Portfolio from './portfolio/Portfolio'

const MKT_OVERVIEW = "Market Overview"
const PORTFOLIO = "Portfolio"

class Dashboard extends Component {

  state = {
    open: false,
    selection: MKT_OVERVIEW
  };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleSelect = (e, text) => {
        e.preventDefault()
        this.setState({selection: text})
        this.handleDrawerClose()
    }

  render() {

    const { open } = this.state;
    const selection = this.state.selection
    let pageToShow
    if (selection === MKT_OVERVIEW) {
        pageToShow = <MarketOverview keys={this.props.keys}/>
    } else if (selection === PORTFOLIO) {
        pageToShow = <Portfolio/>
    }

    return (

      <div>
        <AppBar>
            <Toolbar>
                <IconButton color="inherit" onClick={this.handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <div className="appbar-title">
                    <Typography variant="h6" color="inherit" noWrap>
                        Cryptocurrency Dashboard
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
        >
            <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon/>
            </IconButton>

            <Divider />

            <List>
                <ListItem 
                    button 
                    selected={this.state.selection === MKT_OVERVIEW} 
                    key={MKT_OVERVIEW}
                    onClick= {(e) => this.handleSelect(e, MKT_OVERVIEW)}
                >
                    <ListItemText primary={MKT_OVERVIEW}/>
                </ListItem>

                <ListItem 
                    button 
                    selected={this.state.selection === PORTFOLIO} 
                    key={PORTFOLIO}
                    onClick= {(e) => this.handleSelect(e, PORTFOLIO)}
                >
                    <ListItemText primary={PORTFOLIO} />
                </ListItem>
            </List>
        </Drawer>
        
        <div className="overlay" hidden={!this.state.open}/> 
        <main className="dashboard-wrapper">
            {pageToShow}
        </main>

      </div>
    );
  }
}

export default withTheme()(Dashboard);
