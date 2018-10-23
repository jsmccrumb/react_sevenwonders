import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showValidation: false
    };
    this.inputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={this.state.showValidation ? "was-validated" : ""}>
        <div className="form-group">
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text bg-secondary text-white">Name:</span>
            </div>
            <input ref={this.inputRef} type="text" name="name" className="form-control" required />
            <div className="input-group-append">
              <button type="sumbit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  componentDidMount() {
    if (this.props.hasFocus) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.hasFocus) {
      this.inputRef.current.focus();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({showValidation: true});
    if (e.target.checkValidity()) {
      let data = new FormData(e.target);
      this.props.login(data.get('name'));
    } else {
      return;
    }
  }
}

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showValidation: false
    };
    this.inputRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">Start a Game</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} className={this.state.showValidation ? "was-validated" : ""}>
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">Game Name:</span>
                </div>
                <input ref={this.inputRef} type="text" name="name" className="form-control" required />
              </div>
              <small className="form-text text-danger d-none js-game-form-help">Game name is required</small>
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">Players:</span>
                </div>
                <input id="players-input" type="number" name="players" min="3" max="7" required className="form-control" />
              </div>
              <small className="form-text text-danger d-none js-game-form-help">Players must be between 3 and 7</small>
              <button type="submit" className="btn btn-primary">Start Game</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.hasFocus) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.hasFocus) {
      this.inputRef.current.focus();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({showValidation: true});
    if (e.target.checkValidity()) {
      let data = new FormData(e.target);
      this.props.sendMessage({
        name: data.get('name'),
        maxPlayers: data.get('players'),
        messageType: 'newGame'
      });
    } else {
      return;
    }
  }
}

class OpenGame extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <button className="list-group-item list-group-item-action" onClick={this.onClick}>
        {this.props.name} - {this.props.creatorName} ({this.props.maxPlayers})
      </button>
    );
  }

  onClick(e) {
    this.props.sendMessage({
      messageType: 'joinGame',
      id: this.props.id
    });
  }
}

class OpenGames extends Component {
  render() {
    let sendMessage = this.props.sendMessage;
    const gamesList = this.props.games.map(g => <OpenGame {...g} sendMessage={sendMessage} key={g.id} />);
    return <div className="list-group">{gamesList}</div>;
  }
}

class Lobby extends Component {
  render() {
    return (
      <div>
        <div id="lobby" className="jumbotron container">
          <h1 className="text-center">Seven Wonders</h1>
          <div className="small text-center">
            <p>Created by Antoine Bauza, published by Repos Productions</p>
          </div>
          <hr className="my-4" />
          <Login login={this.props.login} hasFocus={!this.props.name} />
        </div>
        <div className={this.props.name ? "container" : "container d-none"}>
          <div className="row">
            <CreateGame sendMessage={this.props.sendMessage} hasFocus={this.props.name != null} />
            <div className="col">
              <div className="card">
                <div className="card-header">Open Games</div>
                <div className="card-body">
                  <OpenGames games={this.props.games} sendMessage={this.props.sendMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
