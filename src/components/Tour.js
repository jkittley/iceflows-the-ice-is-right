import React from 'react';
import posed from 'react-pose';
import CardList from './CardList';
import LogoHeader from './LogoHeader';
import { FaHandPointLeft, FaHandPointRight, FaDrawPolygon } from 'react-icons/fa';
import { Container, Button, Row, Col } from 'reactstrap';
import { compareFacts } from "../Helpers";
import "./Tour.css";

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

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      animation: "out",
      deck: [],
      autoFlip: false,
      allowTourAdv: true,
      tourStage: 0,
      selectedFact: null,
      guess: null,
    };
    this.advTour = this.advTour.bind(this);
    this.backTour = this.backTour.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goPlay = this.goPlay.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  onFactSelect(fact) {
    if (this.state.tourStage!==2) return;
    this.setState( { selectedFact: fact, autoFlip: false, allowTourAdv: true });
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
    var card1 = this.state.selectedFact.value;
    var card2 = this.state.deck[this.state.deck.length-1][this.state.selectedFact.id];
    var result = compareFacts(this.state.guess, card1, card2)
    if (result === 1) { return "Well done, you got it right!"; }
    else if (result === -1) { return "Whoops, you were wrong. Never mind there are plenty more cards in the pack :)."; } 
    else { return "Hah, it was a draw! What are the chances?!"; }
  }

  goHome() {
    this.setState({ animation: "out" });
    setTimeout(this.props.goHome, 500);
  }

  goPlay() {
    this.setState({ animation: "out" });
    setTimeout(this.props.goPlay, 500);
  }

  render() {
    return <Container fluid className="text-left">
        <Container>
        <TourWrapper pose={this.state.animation}>
        <LogoHeader />
        </TourWrapper>
        <Row className="mt-4">
          <Col md={12} lg={5} className="mb-2">
           <TourWrapper pose={this.state.animation}>
            <div className="bg-white p-4 rounded">
              
              { this.state.tourStage === 0 && <div className="text-center">
               <h3>The ICE IS RIGHT is a card game, which all the penguins down in Antarctic like to play.</h3>
               <h3>Let me show you how its played. Click next to begin.</h3>
               </div>
              }
              { this.state.tourStage === 1 && <div>
               <h3>The game is played with a deck of { this.props.cards.length} cards. One card for each Antarctic Basin.</h3>
               <h3>On the back of each card you can see the Basins name and a map of where it is on the continent.</h3></div>
              }
              { this.state.tourStage === 2 &&
               <h3>On the front, is a list of facts about a this Antarctic Basin. Now pick one, go on click on it.</h3>
              }
              { this.state.tourStage === 3 &&
               <h3>Great, you selected {this.state.selectedFact.title} ({this.state.selectedFact.value} {this.state.selectedFact.unit}). Now I will deal another card.</h3>
              }
              { this.state.tourStage === 4 && <div>
               <h3>Now, I want you to guess if the same fact on this card is higher or lower than the {this.state.selectedFact.value} {this.state.selectedFact.unit} you chose on the previous card. Use the buttons below the card.</h3>
               <h3>Hint: You can use the map to help you, try the buttons in the top left corner.</h3>
               </div>
             }
              { this.state.tourStage === 5 && <div>
               <h3>{this.checkGuess() }</h3>
               <h3>You guessed {this.state.guess}, and the previous card said {this.state.selectedFact.value} {this.state.selectedFact.unit}.</h3>
              </div>
              }
              { this.state.tourStage === 6 && <div>
               <h3>That's It!</h3>
               <h3>You are ready to play. In the game every correct guess scores 100 points and every wrong guess looses 50 points!</h3>
               <Button className="mt-4" size="lg" block color="warning" onClick={ () => this.goPlay() }><FaHandPointRight/> Play <FaHandPointLeft/></Button></div>
              }
              { this.state.tourStage !== 6 &&
              <Button className="mt-4" color="success" onClick={this.advTour} disabled={!this.state.allowTourAdv}><FaHandPointRight/> Next</Button>
              }

            </div>
            </TourWrapper>
          </Col>

          <Col md={12} lg="7">
          <TourWrapper pose={this.state.animation}>
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
            
          </TourWrapper>
          </Col>

        </Row>
        </Container>

        <div className="back-button-pane">  
          <Button color="light" onClick={this.goHome}><FaHandPointLeft/> Back</Button>
        </div>

      </Container>;
  }
}

export default Welcome;