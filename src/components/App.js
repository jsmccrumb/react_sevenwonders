import React, { Component } from 'react';
import Navigation from './Navigation';
import HomePage from './HomePage';
import SevenWonders from './SevenWonders';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.state = {
      navShown: true,
      page: 'home'
    }
  }

  render() {
    let page;
    if (this.state.page === 'home') {
      page = <HomePage />;
    } else if (this.state.page === 'sevenwonders') {
      page = <SevenWonders />;
    }
    return (
      <div className={this.state.navShown ? "app-with-nav" : ""}>
        <Navigation shown={this.state.navShown}
                    handleNavigation={this.handleNavigation} />
        {page}
      </div>
    );
  }

  handleNavigation(page) {
    let navShown = page === 'home';
    this.setState({page, navShown});
  }
}

export default App;
