import React from 'react';
import Fact from './Fact';
import { Card, CardBody, Row, Button, Col } from 'reactstrap';
import posed from 'react-pose';
import { FaHandPointRight, FaHandPointUp, FaHandPointDown } from 'react-icons/fa';
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
    this.flip.bind(this);
    this.play.bind(this);
    this.factSelected.bind(this);
  }

  componentDidMount() {
    this.setState({ animation: "visible" });
    if (this.props.autoFlip && this.props.stopAnimation !== true) {
      setTimeout(() => {
        this.flip();
      }, 15);
    }  
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
    var imgFilePath = require("../res/cardimgs/"+this.props.imagePath);
    var imgCoverPath = require("../res/cardcover.png");
    var displayCSS = "flip-container";
    if (this.state.flipped) displayCSS += " hover";

    return <CardWrapper className="playing-card" pose={ this.state.animation }>
        <div className={displayCSS}>
          <div className="flipper">
            <div className="front">
              <Card style={{ backgroundImage: "url("+imgCoverPath+")" }}>
                <CardBody>
                  <div className="img" style={{ backgroundImage: "url("+imgFilePath+")" }}></div>
                  <h1 className="title">{this.props.title }</h1>
                </CardBody>
              </Card>
            </div>
            <div className="back">
              <Card>
                <div className="img" style={{ backgroundImage: "url("+imgFilePath+")" }}></div>
                <h1 className="title mt-2">{this.props.title }</h1>
              
                { this.props.facts.filter((f) => this.props.settings.showFacts.indexOf(f.id) >= 0).map( (x,i) => (
                    <Fact 
                      key={i} {...x} 
                      isSelected={this.props.highlightFact === x.title} 
                      onClick={this.factSelected.bind(this)} 
                    />
                ))}
        
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
        { this.state.flipped && !this.props.highlightFact && 
          <Button size="lg" color="light" block outline disabled className="mt-2">Please Select a fact</Button>
        }
        { this.props.passCard && this.state.flipped && <Button size="lg" color="light" block className="mt-2" onClick={this.passCard.bind(this)}><FaHandPointRight/> Next</Button> }
        {/* { !this.props.passCard&& this.state.flipped  && <Button size="lg" color="light" block className="mt-2" onClick={ this.props.dealFunc }><FaUndo/> New Card</Button> } */}
    </CardWrapper>;
  }
}

export default PlayingCard;