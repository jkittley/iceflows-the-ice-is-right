import React from 'react';
import Papa from 'papaparse';
import { Container } from 'reactstrap';
import CardList from './components/CardList';
import LogoHeader from './components/LogoHeader';
import GameOver from './components/GameOver';
import ScorePopup from './components/ScorePopup';
import Settings from './components/Settings';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      deck1: [],
      deck2: [],
      deck1SelectedFact: null,
      deck2SelectedFact: null,
      gameOver: false,
      scorePopup: "hidden",
      factMeta: {},
      settings: {
        showFacts: ['fact_fast_flow','fact_max_thick','fact_mean_thick','fact_thick_in_fast_flow']
      }
    };
    this.play.bind(this);
  }

  componentWillMount() {
    var csvFilePath = require("./res/data.csv");
    Papa.parse(csvFilePath, {
      download: true,
      delimiter: ",",
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (x) => x.trim(),
      transformHeader: (x) => x.trim(),
      error: function(err, file, inputElem, reason) {
        console.log("Error");
      },
      complete: function(results) {
        // Get the facts
        var factIds = results.meta.fields.filter(field => field.trim().startsWith("fact")).map(field => field.trim()); 
        var meta = {}
        // Add the rows
        results.data.map(function (row) {
          // Meta data from meta rows
          if (row.title === "meta") {
            factIds.forEach(function (factId) { 
              if (!(factId in meta)) meta[factId] = { id: factId };
              meta[factId][row.imagePath] = row[factId];
            });
          // Facts from rows
          } else {
            var facts = [];
            factIds.forEach(factId => facts.push({ 
              ...meta[factId],
              value: row[factId],
            }))
            // Save Row
            this.setState({ allCards: [...this.state.allCards, { ...row, facts: facts }]});
          }
        }.bind(this));

        // On complete
        this.init();
        this.setState({ factMeta: meta });
        

      }.bind(this)
    });
  }

  reset() {
    window.location.reload();
  }

  init() {
    this.deal1();
    this.deal2();
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
    console.log("You guessed right");
    this.setState({ scorePopup: "in" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 2000);
    setTimeout( () => this.setState({ scorePopup: "hidden" }), 2000);
  }

  loose() {
    console.log("You guessed WRONG");
  }

  draw() {
    console.log("You drew");
  }

  play(guess) {
    console.log("Play", guess);
    var factId = this.state.deck1SelectedFact.id;
    var val1 = this.state.deck1[this.state.deck1.length-1][factId];
    var val2 = this.state.deck2[this.state.deck2.length-1][factId];
    console.log(factId, val1, val2);
    if (val1 > val2) {
      console.log("card 1 is higher");
      if (guess === "higher") this.loose(); else this.win();
    } else if (val2 > val1) {
      console.log("card 2 is higher");
      if (guess === "higher") this.win(); else this.loose();
    } else {
      console.log("They are the same");
      this.draw();
    }


    // var c = this.compareFacts(this.state.deck1SelectedFact, this.state.deck2SelectedFact);
    // console.log(c);
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

  saveSettings (changes) {
    console.log("Saving changes", changes);
    this.setState({ 
      settings: {
        ...this.state.settings,
        ...changes
      }
    })
  }

  render() {
    return (
      <Container>
        <Settings {...this.state.settings} factMeta={this.state.factMeta} onSave={ this.saveSettings.bind(this) } />
        <LogoHeader />
        <div className="decks d-flex flex-row">
          <CardList 
            autoFlip 
            cards={this.state.deck1} 
            settings={this.state.settings}
            deal={ this.deal1.bind(this) } 
            highlightFact={ this.state.deck1SelectedFact ? this.state.deck1SelectedFact.title : null } 
            onFactSelect={ this.onFactSelect1.bind(this) } 
          />
          <CardList 
            cards={this.state.deck2} 
            settings={this.state.settings}
            deal={this.deal2.bind(this)} 
            passCard={this.passCard.bind(this)} 
            highlightFact={ this.state.deck1SelectedFact ? this.state.deck1SelectedFact.title : null } 
            onFactSelect={ this.onFactSelect2.bind(this) } 
            playFunc={ this.play.bind(this) }
          />
        </div>
        <div className="stats text-center mt-2">Cards remaining: { this.state.allCards.length }</div>
       <GameOver show={this.state.gameOver} playAgain={this.reset.bind(this)} />
       <ScorePopup mode={this.state.scorePopup}/>
       </Container>
    );
  }
}


export default Game;
