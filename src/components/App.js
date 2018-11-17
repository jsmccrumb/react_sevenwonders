import React, { Component } from 'react';
import Lobby from './Lobby';
import Waiting from './Waiting';
import GameBoard from './GameBoard';

class App extends Component {
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
    this.selectCard = this.selectCard.bind(this);

    // TODO -- remove debugging
    window.swReact = this;
  }

  // TODO -- pass ws around or keep everything in state here and pass functions?
  render() {
    let page;
    
    if (this.state.status === 'playing') {
      page = (
        <GameBoard {...this.state.wonderOption}
          chooseSide={this.chooseSide}
          playOrder={this.state.playOrder}
          direction={this.state.direction}
          wonder={this.state.wonder}
          hand={this.state.hand}
          selectedCard={this.state.selectedCard}
          selectCard={this.selectCard}
          id={this.state.id} />
      );
    } else if (this.state.status === 'waiting') {
      page = <Waiting {...this.state.currentGame} />;
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
    console.debug('send', data);
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

  selectCard(card) {
    this.setState({selectedCard: card});
  }

  //handle messages from server
  handleMessage(msg) {
    try {
      let parsed = JSON.parse(msg.data);
      console.debug('msg received', parsed);
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
        case 'playOrder':
          this.playOrder(parsed);
          break;
        case 'sideChosen':
          this.sideChosen(parsed);
          break;
        case 'hand':
          this.receiveHand(parsed);
          break;
        case 'playCombos':
          this.playCombos(parsed);
          break;
        default:
          console.debug('Unrecognized message type', parsed);
          break;
      }
    } catch (e) {
      console.debug('Invalid JSON msg received', msg);
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
    this.setState((state, props) => {
      let gameCopy = {...state.currentGame};
      gameCopy.players = [...gameCopy.players, data];
      return {currentGame: gameCopy};
    });
  }

  wonderOption(data) {
    this.setState({wonderOption: data.wonderOption, status: 'playing'});
  }

  playOrder(data) {
    this.setState({playOrder: data.playOrder, direction: data.direction});
  }

  sideChosen(data) {
    if (data.playerId === this.state.id) {
      this.setState({wonder: data.wonder});
    }
    this.setState((state, props) => {
      try {
        // get copy of array + each playOrder object
        let newOrder = [...state.playOrder].map(p => Object.assign({}, p));
        newOrder.filter(p => p.playerId === data.playerId)[0]
            .wonderSide = data.wonder.side;
        return {playOrder: newOrder};
      } catch(e) {
        console.warn("Unable to match chosen wonder side to play order - player summary will be inaccurate until game starts", e);
      }
    });
  }

  receiveHand({hand}) {
    this.setState({hand});
  }

  playCombos({card}) {
    this.setState((state, props) => {
      let oldCard = state.hand.filter(c => {
        return c.name === card.name && c.players === card.players;
      })[0];
      let oldIndex = state.hand.indexOf(oldCard);
      let newHand = [
        ...state.hand.slice(0, oldIndex),
        card,
        ...state.hand.slice(oldIndex + 1)
      ];
      return {hand: newHand};
    });
  }

}

export default App;
