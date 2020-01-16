import React from 'react';
import { PlayingCardBack } from './PlayingCard';
import { Button } from 'reactstrap';
import PrintComponents from "react-print-components";
import "./CardPrint.css";

class CardPrint extends React.Component {

  render() {    
    return <PrintComponents className="print-container" trigger={<Button className="mr-2">{ this.props.text }</Button>}>
      { this.props.cards.map(card => 
        <div className="page">
          <PlayingCardBack {...card} basic={true} allowZoom={false} />
          {/* <PlayingCardFront {...card} basic={true} /> */}
        </div>
      )}
    </PrintComponents>;
  }
}

export default CardPrint;
