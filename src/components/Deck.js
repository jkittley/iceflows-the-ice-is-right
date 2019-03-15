import React from 'react';
import { connect } from 'react-redux';
import PlayingCard from './PlayingCard';
import "./Deck.css";


class Deck extends React.Component {

  render() {

    var topCard = this.props.cards[this.props.cards.length-1];
    var botCard = false;

    return <div className="card-deck">
      { botCard && <PlayingCard {...botCard} {...this.props} /> }
      { topCard && <PlayingCard {...topCard} {...this.props} /> }
    </div>;
  }
}

const mapStateToProps = state => { return { }};
const mapDispatchToProps = { };
export default connect(mapStateToProps, mapDispatchToProps)(Deck);


