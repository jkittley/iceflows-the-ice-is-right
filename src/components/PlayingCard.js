import React from 'react';
import posed from 'react-pose';
import FactList from './FactList';
import { Card, CardBody } from 'reactstrap';
import Map from './Map';
import "./PlayingCard.css"

const CardAnimWrap = posed.div({
  start: {
    y: -500,
    opacity: 0,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    y: 0,
    opacity: 1,
    delay: 400,
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    y: 500,
    opacity: 0,
    transition: {
      default: { duration: 300 }
    }
  },
  pass: {
    x: "-100%",
    opacity: 1,
    transition: {
      default: { duration: 300 }
    }
  }
});

class PlayingCard extends React.Component {
  
  renderFront() {
    return <div className="front">
      <Card>
        <CardBody>
          <div className="img">
            <Map 
              uid={"card_front_"+this.props.id} 
              initLayer={this.props.initMapLayer}
              initZone={this.props.zoneId }
              round={true}
            />
          </div>
          <h1 className="title">{this.props.title }</h1>
        </CardBody>
      </Card>
    </div>;
  }

  renderBack() {
    return <div className="back">
      <Card>
        <div className="img">
          <Map
          uid={"card_back_"+this.props.id } 
          initZone={ this.props.zoneId }
          initLayer={ this.props.initMapLayer }
          />
        </div>
        <h1 className="title mt-2">{ this.props.title }</h1>
        <FactList 
          facts={ this.props.facts } 
          allowSelection={ this.props.allowFactSelection }
          onSelect={ this.props.onFactSelect }
          highlightFact={ this.props.highlightFact } />
      </Card>
    </div>;
  }

  render() {   
    if (this.props.title === undefined) return null;

    var displayCSS = "flip-container";
    if (this.props.flipped) displayCSS += " flipped";
    if (this.props.allowFactSelection) displayCSS += " mouse-over";
 
    return <CardAnimWrap className="playing-card" pose={ this.props.animation} >
        <div className={displayCSS}>
          <div className="flipper">
            { this.renderFront() }
            { this.renderBack() }
          </div>
        </div>    
    </CardAnimWrap>;
  }

}

const uuidv4 = require('uuid/v4');

PlayingCard.defaultProps = {
  id: uuidv4(),
  initMapLayer: null,
  flipped: false,
  allowFactSelection: false,
  onFactSelect: false,
  animation: "start",
  highlightFact: null
}

export default PlayingCard;