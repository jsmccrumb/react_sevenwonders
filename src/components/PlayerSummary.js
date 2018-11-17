import React, { Component } from 'react';

class PlayerSummary extends Component {
  constructor(props) {
    super(props);
    //TODO remove debugging
    if (props.playerName === 'a') { window.myPS = this; }
  }

  render() {
    return (
      <div className="bg-info flex-grow-1 card text-white">
        <div className="card-header">{this.props.playerName}</div>
        <div className="card-body">{this.props.wonderName} {this.props.wonderSide}</div>
      </div>
    );
  }
}

export default PlayerSummary
