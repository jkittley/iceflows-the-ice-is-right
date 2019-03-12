import React from 'react';
import posed from 'react-pose';
import CardList from './CardList';
import LogoHeader from './LogoHeader';
import { FaHandPointLeft } from 'react-icons/fa';
import { Container, Button, Row, Col } from 'reactstrap';
import "./CardBrowser.css";

const TourWrapper = posed.div({
  out: {
    y: -500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    y: 0,
    opacity: 1,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

class CardBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      animation: "out",
      deck: [],
    };
    this.goHome = this.goHome.bind(this);
    this.deal = this.deal.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
    setTimeout( () => this.deal(0), 700);
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  deal(idx) {
    var pick = this.props.cards[idx];
    if (this.state.deck.length > 0) this.setState({  deck: [ ...this.state.deck, pick] }); else this.setState({  deck: [ pick ] });
  }

  goHome() {
    this.setState({ animation: "out" });
    setTimeout(this.props.goHome, 500);
  }

  render() {
    return <Container fluid className="card-browser">
        <TourWrapper pose={this.state.animation}>
        <LogoHeader />
        </TourWrapper>
        <Row className="mt-4">

          <Col sm={12} md={4}>
            <TourWrapper pose={this.state.animation}>
              <div className="options">
              { this.props.cards.sort( (a,b) => a.title > b.title ? 0 : ( a.title < b.title ? -1 : 0 ) ).map( (card, idx) => 
                <Button key={card.id} size="sm" className="m-1" color="light" onClick={ () => this.deal(idx) }>{ card.title }</Button>
              )}
              </div>
            </TourWrapper>
          </Col>

          <Col sm={12} md={8}>
            <TourWrapper pose={this.state.animation}>
              <div className="deck">
              <CardList  
                cards={this.state.deck} 
                autoFlip={true}
                settings={this.props.settings}
                deal={ this.deal.bind(this) } 
                hideControls={true}
                mouseOver={false}
              />
              </div>
            </TourWrapper>
          </Col>
        </Row>
        
        <div className="back-button-pane">  
          <Button color="light" onClick={this.goHome}><FaHandPointLeft/> Back</Button>
        </div>

      </Container>;
  }
}

export default CardBrowser;