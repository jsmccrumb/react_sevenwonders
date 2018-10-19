import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    if (this.props.shown) {
      return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <a href="/" className="navbar-brand">McCrumb's Site</a>
          <ul className="navbar-nav">
            <li className="nav-item">Coming Soon</li>
          </ul>
        </nav>
      );
    } else {
      return (null);
    }
  }
}

export default Navigation;
