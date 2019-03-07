import React from 'react';
import posed from 'react-pose';
import CardList from './CardList';
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa';
import { Container, Button, Row, Col } from 'reactstrap';

const WelcomeWrapper1 = posed.div({
  out: {
    x: 1500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

const WelcomeWrapper2 = posed.div({
  out: {
    x: -1500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      animation: null,
      deck: [],
      autoFlip: false,
      allowTourAdv: true,
      tourStage: 0,
      selectedFact: null,
      guess: null,
    };
    this.advTour = this.advTour.bind(this);
    this.backTour = this.backTour.bind(this);
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  onFactSelect(fact) {
    if (this.state.tourStage!==2) return;
    this.setState( { selectedFact: fact, autoFlip: false, allowTourAdv: true });
    this.advTour();
  }

  deal() {
    var pick = this.props.cards[Math.floor(Math.random()*this.props.cards.length)];
    this.setState({ 
      deck: [...this.state.deck, pick]
    });
  }

  backTour() {
    this.setState({ tourStage: Math.max(0, this.state.tourStage - 1) });
  }

  advTour() {
    var newStage = Math.min(this.state.tourStage + 1, 6);
    if (newStage===1) this.deal();
    if (newStage===2) this.setState({ autoFlip: true, allowTourAdv: false });
    if (newStage===4) { this.deal(); this.setState({ allowTourAdv: false }); }
    if (newStage===5) this.setState({ allowTourAdv: true });
    if (newStage===6) this.setState({ allowTourAdv: false });
    this.setState({ tourStage: newStage });
  }

  play(guess) {
    this.setState({ guess: guess, allowTourAdv: true });
    this.advTour();
  }

  checkGuess() {
    var val1 = this.state.deck[this.state.deck.length-1][this.state.selectedFact.id];
    var val2 = this.state.selectedFact.value;
    if (val1 > val2) {
      return "You were right!";
    } else if (val2 > val1) {
      return "You were wrong :(";
    } else {
      return "Hah, it was a draw!";
    }
  }


  render() {
    return <Container fluid className="text-left">
        <Container>
        <Row className="mt-4">
          <Col xs="5">
           <WelcomeWrapper2 pose={this.state.animation}>
            <div className="bg-white p-4 rounded">
              
              { this.state.tourStage === 0 && <div>
               <h3>Hello and welcome to the ICE IS RIGHT! </h3>
               <h3>Let me remind you of the rules.</h3></div>
              }
              { this.state.tourStage === 1 && <div>
               <h3>I have a deck of cards.</h3>
               <h3>Each card in the deck has a list of facts about a particular Antarctic Basin.</h3></div>
              }
              { this.state.tourStage === 2 &&
               <h3>Look at all those lovely stats! Now pick one, go on click on it.</h3>
              }
              { this.state.tourStage === 3 &&
               <h3>Great, you selected {this.state.selectedFact.title} ({this.state.selectedFact.value} {this.state.selectedFact.unit}). Now I will deal another card.</h3>
              }
              { this.state.tourStage === 4 &&
               <h3>Now, I want you to guess if the same fact on this card is higher or lower than the {this.state.selectedFact.value} {this.state.selectedFact.unit} you chose on the previous card. Use the buttons below the card.</h3>
              }
              { this.state.tourStage === 5 && <div>
               <h3>{this.checkGuess() }</h3>
               <h3>You guessed {this.state.guess}, and the previous card said {this.state.selectedFact.value} {this.state.selectedFact.unit}.</h3>
              </div>
              }
              { this.state.tourStage === 6 && <div>
               <h3>Brilliant! For every correct guess you get 100 points and for every wrong answer you loose 50 point! Are you ready to play?</h3>
               <Button className="mt-4" size="lg" block color="warning" onClick={ () => this.props.goPlay() }><FaHandPointRight/> Play <FaHandPointLeft/></Button></div>
              }
             
              <Button className="mt-4" color="success" onClick={this.advTour} disabled={!this.state.allowTourAdv}><FaHandPointRight/> Next</Button>
             
            </div>
              
            <Button className="mt-4" outline color="light" onClick={this.props.goHome}><FaHandPointLeft/> Back</Button>

            </WelcomeWrapper2>
          </Col>

          <Col xs="7">
          <WelcomeWrapper1 pose={this.state.animation}>
            <div className="decks d-flex">
            <CardList  
              cards={this.state.deck} 
              autoFlip={this.state.autoFlip}
              settings={this.props.settings}
              deal={ this.deal.bind(this) } 
              highlightFact={ this.state.selectedFact ? this.state.selectedFact.title : null } 
              onFactSelect={ this.onFactSelect.bind(this) } 
              playFunc={ this.play.bind(this) }
            />
            </div>
            
          </WelcomeWrapper1>
          </Col>

        </Row>
        </Container>
      </Container>;
  }
}

export default Welcome;