import React from 'react';
import { connect } from 'react-redux';
import { addError, setMusic, goHome, sfx } from './redux/actions';

import { Container, Button, Row, Col } from 'reactstrap';
import { FaHandPointLeft, FaHandPointRight, FaHandPointUp, FaHandPointDown } from 'react-icons/fa';

import GameOver from './components/GameOver';
import ScoreCard from './components/ScoreCard';
import LogoHeader from './components/LogoHeader';
import PlayingCard from './components/PlayingCard';

import { compareFacts } from "./Helpers";
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
      allowFactSelection: true,
      selectedFact: null,
      revealed: false,
      showControls: true,
      gameOver: false,
      allowSelection: true,
      score: 0,
      numDraws: 0,
      deck1Animation: "start",
      deck2Animation: "start"
    };
    this.play = this.play.bind(this);
    this.win = this.win.bind(this);
    this.loose = this.loose.bind(this);
    this.draw = this.draw.bind(this);
    this.reset = this.reset.bind(this);
    this.reveal = this.reveal.bind(this);
    this.onFactSelect = this.onFactSelect.bind(this);
    this.passCard = this.passCard.bind(this);
  }

  componentDidMount() {
    this.setState({ animation: "in" });
    this.props.setMusic("game");
    this.deal(1, false);
    this.deal(2, false);
    setTimeout( () => this.setState({ deck1Animation: "in", deck2Animation: "in" }), 500);
  }

  reset() {
    this.setState({ animation: "out", deck1Animation: "out" });
    this.props.setMusic("menu");
    setTimeout(this.props.goHome, 500);
  }

  deal(deckChoice=2, sound=true) {
    if (this.state.allCards.length <= 0) return this.setState({ gameOver: true });
    if (sound) this.props.sfx("deal");

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
  
  onFactSelect(fact) {
    this.setState({ selectedFact: fact.id });
  }
 
  reveal() {
    this.setState({ revealed: true, allowFactSelection: false, showControls: false });
  }

  play(guess) {
    this.reveal(2);
    setTimeout( () => {
      var factId = this.state.selectedFact;
      var val1 = this.state.deck1[this.state.deck1.length-1][factId];
      var val2 = this.state.deck2[this.state.deck2.length-1][factId];
      if (val1 === null || val2 == null || val1 === undefined || val2 === undefined) return;
      var result = compareFacts(guess, val1, val2);
      if (result === 1) { this.win(); }
      else if (result === -1) { this.loose(); } 
      else { this.draw(); }
    }, 500);

    setTimeout( () => this.setState({ showControls: true }), 2000);
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

  passCard() {
    this.setState({ deck2Animation: "pass" });
    
    setTimeout( () => {
      var topCard = { ...this.state.deck2[this.state.deck2.length-1], flipped: true };
      this.setState({
        deck1: [...this.state.deck1, topCard],
        deck2: this.state.deck2.filter((card) => card.title !== topCard.title),
        selectedFact: null,
        allowFactSelection: true,
        revealed: false,
        deck2Animation: "start"
      });
   
    }, 500);

    setTimeout( () => { 
      this.deal(2);
      this.setState({ deck2Animation: "in" });
    }, 600);
  }

  renderControls() {
    if (this.state.selectedFact !== null && !this.state.revealed) return <div className="buttons">
        <Button size="lg" color="success" onClick={ () => this.play("higher")}><FaHandPointUp/> Higher</Button> 
        <Button size="lg" color="success" onClick={ () => this.play("lower")}><FaHandPointDown/> Lower</Button> 
        </div>;
    if (this.state.revealed) return <div className="buttons">
        <Button size="lg" color="primary" onClick={ () => this.passCard() }><FaHandPointLeft/> Next</Button> 
      </div>;
  }
  
  render() {
    return (
      <Container fluid className="game-area">
        <GameWrap pose={this.state.animation}>
          <LogoHeader size="game" />
        </GameWrap>
        <ScoreCard 
          score={this.state.score} 
          numCards={this.props.cards.length}
          cardsPlayed={this.state.deck1.length}
          numDraws={this.state.numDraws} />
          
            <div className="exit">
            <Button size="sm" color="light" outline onClick={this.reset.bind(this)}>Quit</Button>
            </div>
        

            <div className="decks-wrapper">
              <div className="decks">

                <div className="deck">
                  <PlayingCard 
                    {...this.state.deck1[this.state.deck1.length-1]}
                    allowFactSelection={this.state.allowFactSelection}
                    onFactSelect={ (x) => this.onFactSelect(x) }
                    highlightFact={this.state.selectedFact}
                    animation={this.state.deck1Animation}
                    flipped={true} 
                  />
                </div>

                <div className="deck">
                  <PlayingCard
                    {...this.state.deck2[this.state.deck2.length-1]} 
                    flipped={this.state.revealed}
                    animation={this.state.deck2Animation}
                    highlightFact={this.state.selectedFact}
                  />
                </div>
                <div className="game-controls">
                  { this.state.showControls && this.renderControls() }
                </div>

              </div>
            </div>
        
        
          { this.state.gameOver && <GameOver playAgain={this.reset} settings={this.props.settings} score={this.state.score} /> }
        
       </Container>
    );
  }
}


const mapStateToProps = state => { return { cards: state.cards.all }};
const mapDispatchToProps = { addError, setMusic, goHome, sfx }
export default connect(mapStateToProps, mapDispatchToProps)(Game);