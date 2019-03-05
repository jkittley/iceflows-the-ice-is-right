import React from 'react';
import Papa from 'papaparse';
import { Container } from 'reactstrap';
import CardList from './components/CardList';
import './App.css';
import head from './res/head.png';

const LogoHeader = props => <div className="logo"><img src={head} alt="The Ice Is Right - An Ice Flows Game"/></div>

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      allCards: [],
      deck1: [],
      deck2: [],
      deck1SelectedFact: null,
      deck2SelectedFact: null,
      factTitles: [],
    };
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
        var factTitles = results.meta.fields.filter(field => field.trim().startsWith("fact")).map(field => field.trim()); 
        // Add the rows
        results.data.map(function (row) {
          var facts = [];
          factTitles.forEach(factTitle => facts.push({ 
            title: factTitle, 
            value: row[factTitle],
            unit: row["unit "+factTitle],
            star: row["star "+factTitle],
          }))
          this.setState({ allCards: [...this.state.allCards, {
            ...row,
            facts: facts
          }]});
        }.bind(this));
        this.deal1();
        this.deal2();
      }.bind(this)
    });
  }

  gameOver() {
    alert("Game Over");
  }

  deal1() { this.deal(1); }
  deal2() { this.deal(2); }
  deal(deckChoice=2) {
    if (this.state.allCards.length <= 0) return this.gameOver();
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
    console.log("Fact selected");
    if (deckChoice===1) { this.setState({ deck1SelectedFact: fact }) } 
    else                { this.setState({ deck2SelectedFact: fact }) } 
  }
  factCheck() {
    if (this.state.deck1SelectedFact === null) return false;
    if (this.state.deck2SelectedFact === null) return false;
    if (this.state.deck1SelectedFact.title !== this.state.deck2SelectedFact.title) return false;
    return true;
  }
 
  compareFacts(fact1, fact2) {
    console.log("Comparing");
    if (fact1 === null) return null;
    if (fact2 === null) return null;
    if (fact1.value === fact2.value) return 0;
    if (fact1.value > fact2.value) return 1;
    return -1;
  }

  passCard() {
    console.log("passing Card");
    var topCard = {
      ...this.state.deck2[this.state.deck2.length-1],
      stopAnimation: true,
    };
    this.setState({
      deck1: [...this.state.deck1, topCard],
      deck2: this.state.deck2.filter((card) => card.title !== topCard.title)
    });
  }

  render() {
    return (
      <Container>
        <LogoHeader />
        <div className="decks d-flex flex-row">
          <CardList 
            autoFlip 
            cards={this.state.deck1} 
            deal={ this.deal1.bind(this) } 
            initFact={ this.state.deck1SelectedFact } 
            onFactSelect={ this.onFactSelect1.bind(this) } 
            compareFacts={ this.compareFacts.bind(this) }
          />
          <CardList 
            cards={this.state.deck2} 
            deal={this.deal2.bind(this)} 
            passCard={this.passCard.bind(this)} 
            initFact={ this.state.deck1SelectedFact } 
            onFactSelect={ this.onFactSelect2.bind(this) } 
            compareFacts={ this.compareFacts.bind(this) }/>
        </div>
        <div className="stats text-center mt-2">Cards remaining: { this.state.allCards.length }</div>
       </Container>
    );
  }
}


export default App;
