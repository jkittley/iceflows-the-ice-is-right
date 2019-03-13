import React from 'react';
import FactList from './FactList';
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
    if (this.state.flipped) displayCSS += " flipped";
    if (this.props.mouseOver) displayCSS += " mouse-over";
 
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
                      zoneInfo={this.props.zoneInfo} 
                    />
                  </div>
                  <h1 className="title">{this.props.title }</h1>
                </CardBody>
              </Card>
              <div className="card-controls">
                { !this.props.hideControls &&  !this.state.flipped && this.props.highlightFact && 
                  <Row>
                    <Col>
                      <Button size="lg" color="light" block className="mt-2" onClick={ () => this.play("higher")}><FaHandPointUp/> Higher</Button> 
                    </Col>
                    <Col>
                      <Button size="lg" color="light" block className="mt-2" onClick={ () => this.play("lower")}><FaHandPointDown/> Lower</Button> 
                    </Col>
                  </Row>
                }
              </div>

            </div>
            <div className="back">
              <Card>
                <div className="img">
                  <Map
                   uid={"card_back_"+this.props.id} 
                   initZone={this.props.zoneId }
                   zoneInfo={this.props.zoneInfo} 
                  />
                </div>
                <h1 className="title mt-2">{this.props.title }</h1>
                <FactList uid={this.props.id} settings={this.props.settings} facts={this.props.facts} factSelected={this.factSelected} highlightFact={this.props.highlightFact} />
              </Card>

              <div className="card-controls">
                { !this.props.hideControls && this.state.flipped && !this.props.highlightFact && <div className="text-center p-2 help-select">
                  <h5><FaHandPointUp/> Please Select a fact  <FaHandPointUp/></h5></div>
                }
                { !this.props.hideControls && this.props.allowSelection && !this.props.passCard && this.state.flipped && this.props.highlightFact && <div className="text-center p-2 help-select">
                  <h5><FaHandPointRight/> Make a guess <FaHandPointRight/></h5></div>
                }
                { !this.props.hideControls && this.props.passCard && this.state.flipped && <Button size="lg" color="light" block className="mt-2" onClick={this.passCard.bind(this)}>
                  <FaHandPointRight/> { this.props.numCardsLeft > 0 ? "Deal Next Card" : "Finish" }{' '}<FaHandPointLeft/> 
                </Button> }
                {/* { !this.props.hideControls && !this.props.passCard&& this.state.flipped  && <Button size="lg" color="light" block className="mt-2" onClick={ this.props.dealFunc }><FaUndo/> New Card</Button> } */}
              </div>
            </div>
          </div>
        </div>

    
    </CardWrapper>;
  }
}
const uuidv4 = require('uuid/v4');

PlayingCard.defaultProps = {
  id: uuidv4(),
  hideControls: false,
  passCard: false,
  mouseOver: true,
}

export default PlayingCard;