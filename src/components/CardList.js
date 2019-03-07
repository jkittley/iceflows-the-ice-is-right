import React from 'react';
import PlayingCard from './PlayingCard';
import { CardGroup } from 'reactstrap';
import "./CardList.css";

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
          settings={this.props.settings}
          highlightFact={this.props.highlightFact} 
          onFactSelect={this.props.onFactSelect} 
          compareFacts={this.props.compareFacts} 
          dealFunc={this.props.deal}
          playFunc={this.props.playFunc} 
          {...card} />
      ))}
    </CardGroup>
    </div>;
  }
}

CardList.defaultProps = {
  autoFlip: false
};
         
export default CardList;