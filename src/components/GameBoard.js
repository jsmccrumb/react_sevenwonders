import React, { Component } from 'react';
import WonderOption from './WonderOption';

class GameBoard extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <h1 className="text-center">Pick which side of your Wonder board<br />you would like to use!</h1>
        {this.props.wonderSides.sort((a, b) => a.side < b.side ? -1 : a.side > b.side ? 1 : 0).map(s => <WonderOption key={s.side} name={this.props.wonderName} chooseSide={this.props.chooseSide} {...s} />) }
      </div>
    );
  }
}

export default GameBoard;
