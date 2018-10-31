import React, { Component } from 'react';

class Waiting extends Component {
  render() {
    const playerList = this.props.players.map(p => <li className="list-group-item" key={p.id}>{p.name}</li>);
    return (
      <div className="container">
        <div className="row">
          <div className="col h1 text-center">
            Sevenwonders game <b>{this.props.name}</b>
          </div>
        </div>
        <div className="row">
          <div className="col h3 text-center">
      {/*<span className="btn btn-primary">Add Bot</span>*/}
            Waiting for all players, game requires {this.props.maxPlayers} to start
          </div>
        </div>
        <ul className="row list-group js-player-list">
          {playerList}
        </ul>
      </div>
    );
  }
}

export default Waiting;
