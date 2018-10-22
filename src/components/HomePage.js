import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <div className="row">
            <div className="col-xs-10">
              <h1>Welcome to My Site!</h1>
              <p>I'll update and expand it as I have time...</p>
            </div>
          </div>
        </div>
        <div className="card-deck">
          <div className="card text-white bg-primary">
            <div className="card-header">Seven Wonders!</div>
            <div className="card-body">
              <h4 className="card-title">
                <a href="/sevenwonders/classic.html" className="text-light">Play Now</a>
              </h4>
              <p className="card-text">Play this php version from&nbsp;  
                  <a href="https://github.com/willcrichton/sevenwonders" target="_blank" className="text-light" rel="noopener noreferrer">github</a>,
                  with only minor tweaks by me</p>
            </div>
          </div>
          <div className="card text-white bg-dark">
            <div className="card-header">React SevenWonders</div>
            <div className="card-body">
              <h4 className="card-title">
                COMING SOON!
              </h4>
              <p className="card-text">
                Currently a work in progress, I am building an implementation
                of Seven Wonders using Node.js, Neo4j, and React.
              </p>
            </div>
          </div>
          <div className="card text-white bg-secondary">
            <div className="card-header">Feedback?</div>
            <div className="card-body">
              <p className="card-text">
                You may have noticed, I do not have an eye for design. Feel free to submit
                ideas for formatting and design! Meanwhile, go click "Play Now" and have fun!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
