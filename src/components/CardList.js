import React from 'react';
import PlayingCard from './PlayingCard';
import "./CardList.css";

class CardList extends React.Component {

  render() {

    //var arr = this.props.cards.slice(Math.max(this.props.cards.length - 2, 0));
    var arr = this.props.cards;
    return <div className="card-list">
      { arr.forEach( (card, i) => (    
        <div className="card-list-item" key={this.props.id + "_" + card.id} >
        <PlayingCard 
          id={this.props.id + "_" + card.id}
          style={{ marginTop: i+"px"}}
          autoFlip={this.props.autoFlip} 
          passCard={this.props.passCard} 
          settings={this.props.settings}
          highlightFact={this.props.highlightFact} 
          onFactSelect={this.props.onFactSelect} 
          compareFacts={this.props.compareFacts} 
          dealFunc={this.props.deal}
          playFunc={this.props.playFunc} 
          numCardsLeft={this.props.numCardsLeft}
          hideControls={this.props.hideControls}
          allowSelection={this.props.allowSelection}
          mouseOver={this.props.mouseOver}
          {...card} /></div>
      ))}
     
    </div>;
  }
}

const uuidv4 = require('uuid/v4');

CardList.defaultProps = {
  id: uuidv4(),
  autoFlip: false,
  cards: []
};
         
export default CardList;