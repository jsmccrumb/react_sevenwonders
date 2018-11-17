import React, { Component } from 'react';
import WonderStage from './WonderStage';

class WonderSide extends Component {
  render() {
    window.stages = this.props.stages;
    return (
      <div className="card bg-light">
        <div className="card-header">
          <h1><span className="badge badge-pill badge-primary">{this.props.resource}</span>{this.props.wonderName} {this.props.side}</h1>
        </div>
        <div className="card-body pb-0">
          <div className="row justify-content-between align-items-end">
            {this.props.stages.map(s => <WonderStage key={s.stage} {...s} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default WonderSide;
