import React, { Component } from 'react';
import Lobby from './Lobby';

class SevenWonders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      status: 'pregame',
      games: []
    };

    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.login = this.login.bind(this);
  }

  // TODO -- pass ws around or keep everything in state here and pass functions?
  render() {
    let page;
    
    if (this.state.status === 'playing') {
      page = <Lobby />;
    } else if (this.state.status === 'waiting') {
      page = <Lobby />;
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
    let host = `ws${window.location.protocol === "https:" ? "s" : ""}://${window.location.host}/node/seven_wonders`;
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
    if (this.state.ws && this.state.ws.readyState === 1) {
      this.state.ws.send(JSON.stringify(data));
    }
  }

  login(name) {
    let id = localStorage.getItem(`_swID_${name}`) || '';
    this.setState({name});
    this.getSocket({name, id});
  }

  //handle messages from server
  handleMessage(msg) {
    try {
      let parsed = JSON.parse(msg);
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
  }

}

export default SevenWonders;
