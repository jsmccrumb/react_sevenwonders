import React, { Component } from 'react';

class WonderStage extends Component {
  render() {
    let stageNum = 'I'.repeat(this.props.stage);
    let cost = this.props.cost.split('');
    return (
      <div className="col col-md-3 border border-dark">
        <div className="col-12 mb-2 h4">
          <span className="badge badge-pill badge-secondary position-absolute" style={{top:"-15px"}}>{stageNum}</span>
        </div>
        <div className="col-12 h5">
          Cost: {cost.map((c, i) => <span key={i} className="badge badge-pill badge-primary">{c}</span>)}
        </div>
        <hr className="my-1" />
        <div className="col-12 h4">
          {this.props.points && <span className="mx-2 badge badge-pill badge-primary">{this.props.points}</span>}
          {this.props.military && <span className="mx-2 badge badge-pill badge-danger">{this.props.military}</span>}
          {this.props.coins && <span className="mx-2 badge badge-pill badge-warning">{this.props.coins}</span>}
          {this.props.resource && <span className="mx-2 badge badge-pill badge-primary">{this.props.resource}</span>}
          {this.props.science && <span className="mx-2 badge badge-pill badge-success">{this.props.science}</span>}
          {this.props.custom && <span className="mx-2 badge badge-pill badge-info">{this.props.custom}</span>}
        </div>
      </div>
    );
  }
}

export default WonderStage;
