import React from 'react';
import { connect } from 'react-redux';
import { addError, goHome } from '../redux/actions';
import posed from 'react-pose';
import PlayingCard from './PlayingCard';
import LogoHeader from './LogoHeader';
import { FaHandPointLeft } from 'react-icons/fa';
import { Container, Button, Row, Col } from 'reactstrap';
import "./CardBrowser.css";

const CardBrowserWrapper = posed.div({
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
      animation: "start",
      deckAnimation: "start",
      selectedCard: this.props.cards.length > 0 ? this.props.cards[0] : null,
    };
    this.goHome = this.goHome.bind(this);
    this.selectCard = this.selectCard.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in", deckAnimation: "in" }), 300);
  }

  selectCard(idx) {
    this.setState({ deckAnimation: "out" });
    setTimeout( () => this.setState({ deckAnimation: "start" }), 300);
    setTimeout( () => this.setState({  selectedCard: this.props.cards[idx], deckAnimation: "in" }), 510);
  }

  goHome() {
    this.setState({ animation: "out", deckAnimation: "out" });
    setTimeout(this.props.goHome, 500);
  }

  renderDeck() {
    if (this.props.cards.length === 0) return null;
    return <div className="deck">
    <PlayingCard 
      animation={this.state.deckAnimation}
      flipped={true} 
      {...this.state.selectedCard}
    />
    </div>;
        
  //   return 
  //   <div className="deck">
  //   <CardList  
  //     cards={this.state.deck} 
  //     autoFlip={true}
  //     settings={this.props.settings}
  //     deal={ this.deal.bind(this) } 
  //     hideControls={true}
  //     mouseOver={false}
  //   />
  //   </div>
  //  </DeckWrapper>;
  }

  renderOptions() {
    if (this.props.cards.length === 0) return null;
    return <CardBrowserWrapper pose={this.state.animation}>
    <div className="options">
    { this.props.cards.map( (card, idx) => 
      <Button key={card.id} size="sm" className="m-1" color="light" onClick={ () => this.selectCard(idx) }>{ card.title }</Button>
    )}
    </div></CardBrowserWrapper>;
  }

  render() {
    if (this.props.cards.length === 0) {
      this.props.addError("No cards, please refresh and try again");
      return null;
    }
    
    return <Container fluid className="card-browser">
        <CardBrowserWrapper pose={this.state.animation}>
        <LogoHeader />
        </CardBrowserWrapper>

        <Row className="mt-4">
          <Col sm={12} md={4}>
            { this.renderOptions() }
          </Col>
          <Col sm={12} md={8}>
            { this.renderDeck()}
          </Col>
        </Row>
        <div className="back-button-pane">  
          <Button color="light" onClick={this.goHome}><FaHandPointLeft/> Back</Button>
        </div>
      </Container>;
  }
}

const mapStateToProps = state => { return {
  cards: state.cards.all, 
}};
const mapDispatchToProps = { addError, goHome }

export default connect(mapStateToProps, mapDispatchToProps)(CardBrowser);
