import React from 'react';
import Fact from './Fact';
import { Card, CardBody, Row, Button, Col } from 'reactstrap';
import posed from 'react-pose';
import { FaHandPointLeft, FaHandPointRight, FaHandPointUp, FaHandPointDown } from 'react-icons/fa';
import Map from './Map';
import "./PlayingCard.css"

const CardWrapper = posed.div({
  hidden: {
    y: -500,
    opacity: 0,
    transition: { duration: 150 }
  },
  visible: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 100, damping: 15 },
      default: { duration: 300 }
    }
  },
  passToOther: {
    x: "-100%",
    opacity: 1,
    transition: { duration: 200 }
  },
});;

class PlayingCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shutting: false,
      flipped: props.stopAnimation === true ? true : false,
      animation: props.stopAnimation === true ? "visible" : "hidden",
    };
    this.flip = this.flip.bind(this);
    this.play = this.play.bind(this);
    this.factSelected = this.factSelected.bind(this);
  }

  componentDidMount() {
    this.setState({ animation: "visible" });
    if (this.props.autoFlip && this.props.stopAnimation !== true) {
      setTimeout(() => {
        this.flip();
      }, 15);
    }  
  }

  componentDidUpdate(prevProps, prevState) {
    // If the property auto flip changes then flip
    if (!prevState.flipped && this.props.autoFlip) { this.flip(); }
  }

  play(guess) {
    this.flip();
    if (this.props.playFunc) this.props.playFunc(guess);
  }

  flip (dir=true) {
    this.setState({ flipped: dir });
  }

  passCard () {
    this.setState({ animation: "passToOther" });
    setTimeout(() => {
       this.props.passCard(); 
       this.props.dealFunc();
    }, 250);
  }

  factSelected(fact) {
    if (this.props.onFactSelect) this.props.onFactSelect(fact);
  }

  render() {   
    if (this.props.title === undefined) return null;
    var displayCSS = "flip-container";
    if (this.state.flipped) displayCSS += " hover";

    return <CardWrapper className="playing-card" pose={ this.state.animation }>
        <div className={displayCSS}>
          <div className="flipper">
            <div className="front">
              <Card>
                <CardBody>
                  <div className="img">
                    <Map 
                      uid={"card_front_"+this.props.id} 
                      initLayer={this.props.imagePath }
                      initZone={this.props.zoneId }
                      round={true}
                    />
                  </div>
                  <h1 className="title">{this.props.title }</h1>
                </CardBody>
              </Card>
            </div>
            <div className="back">
              <Card>
                <div className="img">
                  <Map
                   uid={"card_back_"+this.props.id} 
                   initLayer={this.props.imagePath }
                   initZone={this.props.zoneId }
                   round={true}
                  />
                </div>
                
                <h1 className="title mt-2">{this.props.title }</h1>
                <div className="fact-list">
                { this.props.facts.filter((f) => this.props.settings.showFacts.indexOf(f.id) >= 0).map( (x,i) => (
                    <Fact 
                      key={i} {...x} 
                      cardId={this.props.id}
                      isSelected={this.props.highlightFact === x.title} 
                      onClick={this.factSelected.bind(this)} 
                    />
                ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        { !this.state.flipped && this.props.highlightFact && 
          <Row>
            <Col style={{ paddingRight: "2px" }}>
              <Button size="lg" color="light" block className="mt-2" onClick={ () => this.play("higher")}><FaHandPointUp/> Higher</Button> 
            </Col>
            <Col style={{ paddingLeft: "2px" }}>
              <Button size="lg" color="light" block className="mt-2" onClick={ () => this.play("lower")}><FaHandPointDown/> Lower</Button> 
            </Col>
          </Row>
        }
        { this.state.flipped && !this.props.highlightFact && <div className="text-center p-2">
          <h5 className="text-white">Please Select a fact</h5></div>
        }
        { this.props.passCard && this.state.flipped && <Button size="lg" color="light" block className="mt-2" onClick={this.passCard.bind(this)}>
          <FaHandPointRight/> { this.props.numCardsLeft > 0 ? "Deal Next Card" : "Finish" }{' '}<FaHandPointLeft/> 
        </Button> }
        {/* { !this.props.passCard&& this.state.flipped  && <Button size="lg" color="light" block className="mt-2" onClick={ this.props.dealFunc }><FaUndo/> New Card</Button> } */}
    </CardWrapper>;
  }
}

export default PlayingCard;