import React from 'react';
import PlayingCard from './PlayingCard';
import { CardGroup, Button } from 'reactstrap';

class CardList extends React.Component {

  render() {
    //var arr = this.props.cards.slice(Math.max(this.props.cards.length - 2, 0));
    var arr = this.props.cards;
    return <div className="w-100 px-1">
      <CardGroup className="card-list">
      { arr.map((card, i) => (    
        <PlayingCard 
          style={{ marginTop: i+"px"}}
          key={card.title} 
          autoFlip={this.props.autoFlip} 
          passCard={this.props.passCard} 
          initFact={this.props.initFact} 
          onFactSelect={this.props.onFactSelect} 
          compareFacts={ this.props.compareFacts } 
          dealFunc={ this.props.deal }
          {...card} />
      ))}
    </CardGroup>
    </div>;
  }
}

export default CardList;