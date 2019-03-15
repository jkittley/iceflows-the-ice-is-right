import React from 'react';
import { connect } from 'react-redux';
import { addError, goHome } from '../redux/actions';
import posed from 'react-pose';
import CardList from './CardList';
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

const DeckWrapper = posed.div({
  out: {
    x: 500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    x: 0,
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
      deckAnimation: "out",
      deck: [],
    };
    this.goHome = this.goHome.bind(this);
    this.deal = this.deal.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in", deckAnimation: "in" }), 500);
    setTimeout( () => this.deal(0), 700);
    this.deal(0);
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  deal(idx) {
    console.log("dealing");
    // if (this.state.deck.length > 0 && this.state.deck[0].id === this.props.cards[idx].id) return; 
    this.setState({ deckAnimation: "out" });
    setTimeout( () => { 
      this.setState({  deck: [ this.props.cards[idx] ], deckAnimation: "in" });
    }, 500);
  }

  goHome() {
    this.setState({ animation: "out" });
    setTimeout(this.props.goHome, 500);
  }

  renderDeck() {
    if (this.props.cards.length === 0) return null;
    return <DeckWrapper pose={this.state.deckAnimation}>
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
   </DeckWrapper>;
  }

  renderOptions() {
    if (this.props.cards.length === 0) return null;
    return <CardBrowserWrapper pose={this.state.animation}>
    <div className="options">
    { this.props.cards.sort( (a,b) => a.title > b.title ? 0 : ( a.title < b.title ? -1 : 0 ) ).map( (card, idx) => 
      <Button key={card.id} size="sm" className="m-1" color="light" onClick={ () => this.deal(idx) }>{ card.title }</Button>
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
