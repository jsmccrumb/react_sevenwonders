import React, { Component } from 'react';
import WonderOption from './WonderOption';
import WonderSide from './WonderSide';
import PlayersSummary from './PlayersSummary';
import Card from './Card';

// TODO move this to it's own file
class Alert extends Component {
  render() {
    return this.props.message ? (
      <div className="alert alert-dismissable alert-info">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        {this.props.message}
      </div>
    ) : null;
  }
}

class CardOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'play'
    }
  }

  render() {
    return (
      <>
        <ul className="nav nav-tabs nav-justified" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="play-tab" data-toggle="tab" href="#play" role="tab" aria-controls="play" aria-selected="true">Play</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="wonder-tab" data-toggle="tab" href="#wonder" role="tab" aria-controls="wonder" aria-selected="false">Wonder</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="discard-tab" data-toggle="tab" href="#discard" role="tab" aria-controls="discard" aria-selected="false">Contact</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="play" role="tabpanel" aria-labelledby="play-tab">This is where you learn how you can play card</div>
          <div className="tab-pane fade" id="wonder" role="tabpanel" aria-labelledby="wonder-tab">This is where you learn how you can build wonder stage</div>
          <div className="tab-pane fade" id="discard" role="tabpanel" aria-labelledby="discard-tab">This is wher you learn you get 3 monies for discarding</div>
        </div>
      </>
    );
  }
}

class GameBoard extends Component {
  render() {
    let wonder;
    let hand;
    let message;
    if (this.props.wonder != null) {
      wonder = (
        <>
          <WonderSide {...this.props.wonder} />
        </>
      );
      if (this.props.hand == null) {
        message = "Waiting for other players to choose";
      }
    } else if (this.props.wonderSides != null) {
      wonder = (
        <>
          {this.props.wonderSides.sort((a, b) => a.side < b.side ? -1 : a.side > b.side ? 1 : 0).map(s => <WonderOption key={s.side} chooseSide={this.props.chooseSide} wonderName={this.props.wonderName} {...s} />) }
        </>
      );
      message = "Pick which side of your Wonder board you would like to use!";
    }
    if (this.props.hand != null) {
      hand = (
        <>
          {this.props.hand.map((card, i) => {
            let isSelected = this.props.selectedCard &&
                this.props.selectedCard.name === card.name &&
                this.props.selectedCard.players === card.players;
            return <Card key={card.name + card.players} {...card} isSelected={isSelected} offset={2 * i} selectCard={this.props.selectCard} />
          })}
        </>
      );
    }
    if (this.props.selectedCard != null) {

    }
    return (
      <div className="container-fluid">
        <PlayersSummary playOrder={this.props.playOrder}
            direction={this.props.direction} />
        <div className="row">
          <Alert message={message} />
        </div>
        <div className="row d-flex justify-content-between">
          <div id="hand" className="flex-grow-1 d-overlap-grid">
            {hand}
          </div>
          <div style={{width:"20em"}}><CardOptions /></div>
        </div>
        {wonder}
      </div>
    );
  }
}

export default GameBoard;
