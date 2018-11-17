import React, { Component } from 'react';
class Card extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    let cardClass = `card bg-secondary wonder-card${this.props.isSelected ? ' selected' : ''}`;
    let style = {transform: `translateX(-${this.props.offset}em)`};
    console.info(style)
    return (
      <div className={cardClass} style={style} onClick={this.onClick}>
        <div className="card-header">{this.props.name}</div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Cost: </strong>{this.props.cost}
            </li>
            <li className="list-group-item">
              <strong>Value: </strong>{this.props.value}
            </li>
            <li className="list-group-item">
              <strong>Free With: </strong>{this.props.freeFrom}
            </li>
            <li className="list-group-item">
              <strong>Free Builds: </strong>{this.props.freeBuilds.map(c => c.name).join(', ')}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  onClick(e) {
    this.props.selectCard({name: this.props.name, players: this.props.players});
  }
}

export default Card;
