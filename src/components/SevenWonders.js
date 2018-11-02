import React, { Component } from 'react';
import Lobby from './Lobby';
import Waiting from './Waiting';
import GameBoard from './GameBoard';

class SevenWonders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      status: 'pregame',
      games: [],
      currentGame: {}
    };

    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.login = this.login.bind(this);
    this.chooseSide = this.chooseSide.bind(this);
  }

  // TODO -- pass ws around or keep everything in state here and pass functions?
  render() {
    let page;
    
    if (this.state.status === 'playing') {
      page = <GameBoard {...this.state.currentGame} />;
    } else if (this.state.status === 'waiting') {
      page = <Waiting {...this.state.currentGame} />;
    } else if (this.state.status === 'choosing') {
      page = <GameBoard {...this.state.wonderOption} chooseSide={this.chooseSide} />
    } else {
      page = (
        <Lobby login={this.login} sendMessage={this.sendMessage} games={this.state.games}
            id={this.state.id} name={this.state.name}/>
      );
    }

    return page;
  }

  // TODO -- do I need to remove onopen listener?
  getSocket(data) {
    let host = `ws${window.location.protocol === "https:" ? "s" : ""}://${window.location.hostname}/node/seven_wonders`;
    let ws = this.createSocket(host);
    let onOpen = () => {
      ws.send(JSON.stringify(Object.assign(data, {messageType: 'login'})));
    }
    ws.onopen = onOpen;
    ws.onmessage = this.handleMessage;
    this.setState({ws});
  }

  createSocket(host) {
    if(window.WebSocket) return new WebSocket(host);
    else if(window.MozWebSocket) return new window.MozWebSocket(host);
  }

  sendMessage(data) {
    console.log('send', data);
    if (this.state.ws && this.state.ws.readyState === 1) {
      this.state.ws.send(JSON.stringify(data));
    }
  }

  login(name) {
    let id = localStorage.getItem(`_swID_${name}`) || '';
    this.setState({name, games: []});
    this.getSocket({name, id});
  }

  chooseSide(data) {
    this.sendMessage({messageType: 'wonderSide', ...data});
  }

  //handle messages from server
  handleMessage(msg) {
    try {
      let parsed = JSON.parse(msg.data);
      console.log('msg received', parsed);
      switch (parsed.messageType) {
        case 'myInfo':
          this.setMyInfo(parsed);
          break;
        case 'newGame':
          this.addGame(parsed);
          break;
        case 'joinGame':
          this.joinGame(parsed);
          break;
        case 'newPlayer':
          this.newPlayer(parsed);
          break;
        case 'wonderOption':
          this.wonderOption(parsed);
          break;
        default:
          console.log('Unrecognized message type', parsed);
          break;
      }
    } catch (e) {
      console.log('Invalid JSON msg received', msg);
      return;
    }
  }

  setMyInfo(data) {
    this.setState({id: data.id});
  }

  addGame(data) {
    this.setState((state, props) => state.games.push(data));
  }

  joinGame(data) {
    this.setState({currentGame: data, status: 'waiting'});
  }

  newPlayer(data) {
    this.setState((state, props) => state.currentGame.players.push(data));
  }

  wonderOption(data) {
    this.setState({wonderOption: data.wonderOption, status: 'choosing'});
  }

}

export default SevenWonders;
