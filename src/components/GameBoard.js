import React, { Component } from 'react';
import WonderSide from './WonderSide';

class GameBoard extends Component {
  render() {
    window.sides = this.props.wonderOption.wonderSides;
    return (
      <div className="container">
        {this.props.wonderOption.wonderSides.sort((a, b) => a.side < b.side ? -1 : a.side > b.side ? 1 : 0).map(s => <div key={s.side} className="my-4"><WonderSide key={s.side} name={this.props.wonderOption.wonderName} {...s} /></div>) }
      </div>
    );
  }
}

export default GameBoard;
