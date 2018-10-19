import React, { Component } from 'react';
import Navigation from './Navigation';
import HomePage from './HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navShown: true,
      page: 'home'
    }
  }

  render() {
    let page;
    if (this.state.page === 'home') {
      page = <HomePage />;
    }
    return (
      <div className={this.state.navShown ? "app-with-nav" : ""}>
        <Navigation shown={this.state.navShown} />
        {page}
      </div>
    );
  }
}

export default App;
