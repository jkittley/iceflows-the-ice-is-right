import React from 'react';
import { Container, Button } from 'reactstrap';
import CardList from './components/CardList';
import GameOver from './components/GameOver';
import ScoreCard from './components/ScoreCard';
import LogoHeader from './components/LogoHeader';
import { compareFacts } from "./Helpers";
import gamemusic from './res/sounds/gamemusic.wav';
import menumusic from './res/sounds/menumusic.wav';
import posed from 'react-pose';
import "./Game.css"

const GameWrap = posed.div({
  start: {
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
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    y: -500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      animation: "hidden",
      allCards: props.cards,
      deck1: [],
      deck2: [],
      deck1SelectedFact: null,
      deck2SelectedFact: null,
      gameOver: false,
      allowSelection: true,
      score: 0,
      numDraws: 0,
    };
    this.play = this.play.bind(this);
    this.win = this.win.bind(this);
    this.loose = this.loose.bind(this);
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.setState({ animation: "in" });
    this.deal1();
    this.deal2();
    this.props.changeTrack(gamemusic);
  }

  reset() {
    this.setState({ animation: "out" });
    this.props.changeTrack(menumusic);
    setTimeout( () => this.props.exitGame(), 500);
  }

  deal1() { this.deal(1); }
  deal2() { this.deal(2); }
  deal(deckChoice=2) {
    if (this.state.allCards.length <= 0) return this.setState({ gameOver: true });
    var pick = this.state.allCards[Math.floor(Math.random()*this.state.allCards.length)];
    if (deckChoice===1) {
      this.setState({ 
        allCards: this.state.allCards.filter((x) => x !== pick),
        deck1: [...this.state.deck1, pick]
      })
    } else { 
      this.setState({ 
        allCards: this.state.allCards.filter((x) => x !== pick),
        deck2: [...this.state.deck2, pick]
      })
    }
  }
  
  onFactSelect1(x) { this.onFactSelect(1, x); }
  onFactSelect2(x) { this.onFactSelect(2, x); }
  onFactSelect(deckChoice, fact) {
    if (deckChoice===1) { this.setState({ deck1SelectedFact: fact }) } 
    else                { this.setState({ deck2SelectedFact: fact }) } 
  }
  factCheck() {
    if (this.state.deck1SelectedFact === null) return false;
    if (this.state.deck2SelectedFact === null) return false;
    if (this.state.deck1SelectedFact.id !== this.state.deck2SelectedFact.id) return false;
    return true;
  }
 
  win () {
    this.setState({ allowSelection: false, score: this.state.score + 100 });
  }

  loose() {
    this.setState({ allowSelection: false, score: this.state.score - 50});
  }

  draw() {
    this.setState({ allowSelection: false, numDraws: this.state.numDraws + 1});
  }

  play(guess) {
    var factId = this.state.deck1SelectedFact.id;
    var val1 = this.state.deck1[this.state.deck1.length-1][factId];
    var val2 = this.state.deck2[this.state.deck2.length-1][factId];
    var result = compareFacts(guess, val1, val2);
    if (result === 1) { this.win(); }
    else if (result === -1) { this.loose(); } 
    else { this.draw(); }
  }

  passCard() {
    var topCard = {
      ...this.state.deck2[this.state.deck2.length-1],
      stopAnimation: true,
    };
    this.setState({
      deck1: [...this.state.deck1, topCard],
      deck2: this.state.deck2.filter((card) => card.title !== topCard.title),
      deck1SelectedFact: null,
      allowSelection: true
    });
  }

  render() {
    return (
      <Container fluid className="game-area">
        <GameWrap pose={this.state.animation}>
          <LogoHeader size="game" />
          <ScoreCard 
            score={this.state.score} 
            numCards={this.props.cards.length}
            cardsPlayed={this.state.deck1.length}
            settings={this.props.settings} 
            numDraws={this.state.numDraws} />
          
            <div className="exit">
            <Button size="sm" color="light" outline onClick={this.reset.bind(this)}>Quit</Button>
            </div>

            <div className="decks-wrapper">
              <div className="decks">
                <CardList 
                  autoFlip 
                  cards={this.state.deck1} 
                  settings={this.props.settings}
                  deal={ this.deal1.bind(this) } 
                  highlightFact={ this.state.deck1SelectedFact ? this.state.deck1SelectedFact.title : null } 
                  onFactSelect={ this.onFactSelect1.bind(this) } 
                  zoneInfo={this.props.zoneInfo} 
                  allowSelection={this.state.allowSelection}
                />
                <CardList 
                  cards={this.state.deck2} 
                  settings={this.props.settings}
                  deal={this.deal2.bind(this)} 
                  passCard={this.passCard.bind(this)} 
                  highlightFact={ this.state.deck1SelectedFact ? this.state.deck1SelectedFact.title : null } 
                  onFactSelect={ this.onFactSelect2.bind(this) } 
                  playFunc={ this.play.bind(this) }
                  numCardsLeft={this.props.cards.length-this.state.deck1.length}
                  zoneInfo={this.props.zoneInfo} 
                  allowSelection={this.state.allowSelection}
                />
              </div>
            </div>
        
        
          { this.state.gameOver && <GameOver playAgain={this.reset.bind(this)} settings={this.props.settings} score={this.state.score} /> }
        </GameWrap>
       </Container>
    );
  }
}


export default Game;
