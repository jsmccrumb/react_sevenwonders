import React, { Component } from 'react';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.onNavigate = this.onNavigate.bind(this);
  }

  render() {
    if (this.props.shown) {
      return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <a href="/" data-page="home" className="navbar-brand" onClick={this.onNavigate}>
            McCrumb's Site
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/sevenwonders/classic.html" data-page="sevenwonders" className="nav-link" onClick={this.onNavigate}>
                SevenWonders
              </a>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (null);
    }
  }

  onNavigate(e) {
    if (window.location.hostname === 'localhost') {
      e.preventDefault();
      this.props.handleNavigation(e.target.dataset.page);
    }
  }
}

export default Navigation;
