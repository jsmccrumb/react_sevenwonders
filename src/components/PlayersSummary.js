import React, { Component } from 'react';
import PlayerSummary from './PlayerSummary';

class PlayersSummary extends Component {
  render() {
    let players = this.props.playOrder && this.props.playOrder.map((p, i, arr) => {
      return (
        <React.Fragment key={p.playerId}>
          <PlayerSummary {...p} />
          {i !== arr.length - 1 && 
              <div><span className={`h1 fa fa-angle-${this.props.direction}`}></span></div>}
        </React.Fragment>
      );
    });
    return (
      <div className="d-flex align-items-center">{players}</div>
    );
  }
}

export default PlayersSummary;
