import React from 'react';
import { Container } from 'reactstrap';
import CardList from './components/CardList';
import GameOver from './components/GameOver';
import ScoreCard from './components/ScoreCard';
import LogoHeader from './components/LogoHeader';
import "./Game.css"

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allCards: props.cards,
      deck1: [],
      deck2: [],
      deck1SelectedFact: null,
      deck2SelectedFact: null,
      gameOver: false,
      score: 0,
      numDraws: 0,
    };
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    this.deal1();
    this.deal2();
  }

  reset() {
    window.location.reload();
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
    this.setState({ score: this.state.score + 100 });
  }

  loose() {
    // var newScore = Math.max(this.state.score - 1, 0);
    this.setState({ score: this.state.score - 50});
  }

  draw() {
    console.log("DRAW");
    this.setState({ numDraws: this.state.numDraws + 1});
  }

  play(guess) {
    var factId = this.state.deck1SelectedFact.id;
    var val1 = this.state.deck1[this.state.deck1.length-1][factId];
    var val2 = this.state.deck2[this.state.deck2.length-1][factId];
    if (val1 > val2) {
      if (guess === "higher") this.loose(); else this.win();
    } else if (val2 > val1) {
      if (guess === "higher") this.win(); else this.loose();
    } else {
      this.draw();
    }
  }

  passCard() {
    var topCard = {
      ...this.state.deck2[this.state.deck2.length-1],
      stopAnimation: true,
    };
    this.setState({
      deck1: [...this.state.deck1, topCard],
      deck2: this.state.deck2.filter((card) => card.title !== topCard.title),
      deck1SelectedFact: null
    });
  }

  render() {
    return (
      <Container fluid className="game-area">
        <LogoHeader />
        <ScoreCard 
          score={this.state.score} 
          numCards={this.props.cards.length}
          cardsPlayed={this.state.deck1.length}
          settings={this.props.settings} 
          numDraws={this.state.numDraws} />
        <Container>
        <div className="decks d-flex flex-row">
          <CardList 
            autoFlip 
            cards={this.state.deck1} 
            settings={this.props.settings}
            deal={ this.deal1.bind(this) } 
            highlightFact={ this.state.deck1SelectedFact ? this.state.deck1SelectedFact.title : null } 
            onFactSelect={ this.onFactSelect1.bind(this) } 
          />
          <CardList 
            cards={this.state.deck2} 
            settings={this.props.settings}
            deal={this.deal2.bind(this)} 
            passCard={this.passCard.bind(this)} 
            highlightFact={ this.state.deck1SelectedFact ? this.state.deck1SelectedFact.title : null } 
            onFactSelect={ this.onFactSelect2.bind(this) } 
            playFunc={ this.play.bind(this) }
          />
        </div>
        
        { this.state.gameOver && <GameOver playAgain={this.reset.bind(this)} score={this.state.score} /> }
        </Container>
       </Container>
    );
  }
}


export default Game;
