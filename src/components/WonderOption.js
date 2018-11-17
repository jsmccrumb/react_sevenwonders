import React, { Component } from 'react';
import WonderSide from './WonderSide';

class WonderOption extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className="my-4 cursor-pointer" onClick={this.onClick}>
        <WonderSide {...this.props} />
      </div>
    );
  }

  onClick(e) {
    this.props.chooseSide({wonderName: this.props.wonderName, side: this.props.side});
  }
}

export default WonderOption;
