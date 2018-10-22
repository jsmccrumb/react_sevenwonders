import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form onSubmit={this.props.setName} className={this.props.showValidation ? "was-validated" : ""}>
        <div className="form-group">
          <div className="input-group mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text bg-secondary text-white">Name:</span>
            </div>
            <input type="text" name="name" className="form-control" required />
            <div className="input-group-append">
              <button type="sumbit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      gameName: null,
      maxPlayers: 3
    };

    this.setName = this.setName.bind(this);
  }

  render() {
    return (
      <div>
        <div id="lobby" className="jumbotron container">
          <h1 className="text-center">Seven Wonders</h1>
          <div className="small text-center">
            <p>Created by Antoine Bauza, published by Repos Productions</p>
          </div>
          <hr className="my-4" />
          <Login showValidation={this.state.nameSubmitted} setName={this.setName} />
        </div>
        <div className="container d-none js-games-container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">Start a Game</div>
                <div className="card-body js-start-game-form">
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Game Name:</span>
                    </div>
                    <input id="game-input" type="text" name="gameName" className="form-control" />
                  </div>
                  <small className="form-text text-danger d-none js-game-form-help">Game name is required</small>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Players:</span>
                    </div>
                    <input id="players-input" type="number" name="players" min="3" max="7" className="form-control" />
                  </div>
                  <small className="form-text text-danger d-none js-game-form-help">Players must be between 3 and 7</small>
                  <span className="btn btn-primary js-start-game">Start Game</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-header">Open Games</div>
                <div className="card-body" id="open-games-region">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setName(e) {
    e.preventDefault();
    this.setState({nameSubmitted: true});
    if (e.target.checkValidity()) {
      let data = new FormData(e.target);
      this.props.login(data.get('name'));
    } else {
      return;
    }
  }
}

export default Lobby;
