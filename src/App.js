import React from 'react';
import Game from './Game';
import ScreenTooSmall from './components/ScreenTooSmall';
import Welcome from './components/Welcome';
import Settings from './components/Settings';
import SoundSettings from './components/SoundSettings';
import MusicPlayer from './components/MusicPlayer';
import Papa from 'papaparse';
import './App.css';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-79207363-1');

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      gameOn: false,   
      dataLoaded: false,
      cards: [], 
      mounted: false,
      settings: {
        showFacts: ['fact_fast_flow','fact_max_thick','fact_mean_thick','fact_thick_in_fast_flow'],
        muteSFX: false,
        muteMusic: true,
      },
      factMeta: {},
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  
  componentDidMount() {
    this.loadData();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    setTimeout( () => this.setState({ mounted: true }), 200);
  }

  loadData() {
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
        console.log("Error", err);
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
            this.setState({ cards: [...this.state.cards, { 
              ...row, 
              id: row['No'],
              facts: facts 
            }]});
          }
        }.bind(this));

        // On complete
        this.setState({ factMeta: meta, dataLoaded: true });
      
      }.bind(this)
    });
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  startGame() {
    this.setState({ gameOn: true });
  }

  saveSettings (changes) {
    this.setState({ 
      settings: {
        ...this.state.settings,
        ...changes
      }
    })
  }

  getMain() {
    if (this.state.width < 800 || this.state.height < 600) return <ScreenTooSmall settings={this.state.settings}/>;
    if (this.state.gameOn) return <Game cards={this.state.cards} settings={this.state.settings}/>;
    return <Welcome cards={this.state.cards} dataLoaded={this.state.dataLoaded} settings={this.state.settings} onClick={ this.startGame.bind(this) }/>
  }

  render() {
    var twitterCard = require("./res/twitter-card.png");
    var openCard = require("./res/opengraph-card.png");
    if (this.state.mounted===false) return <div className="loading"><h1>Loading...</h1></div>;
    return <div className="app">
    <Helmet>
      <meta charSet="utf-8" />
      <title>The Ice Is Right - An Ice Flows Game</title>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@iceflowsgame"/>
      <meta name="twitter:title" content="The Ice Is Right - An Ice Flows Game"/>
      <meta name="twitter:description" content="A game about ice flow in the Antarctic" />
      <meta name="twitter:creator" content="@iceflowsgame"/>
      <meta name="twitter:image" content={"http://www.iceflowsgame.com"+twitterCard} />
      <meta property="og:title" content="Ice Flows" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="http://www.iceflowsgame.com/theiceisright/" />
      <meta property="og:image" content={"http://www.iceflowsgame.com"+openCard} />
      <meta property="og:description" content="A game about ice flow in the Antarctic" />
      <meta property="og:site_name" content="The Ice Is Right - An Ice Flows Game" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />
    </Helmet>
    <MusicPlayer url={require('./res/sounds/gamemusic.wav')} muted={this.state.settings.muteMusic } autoPlay autoResume loop />
    <Settings {...this.state.settings} factMeta={this.state.factMeta} onSave={ this.saveSettings.bind(this) } />
    <SoundSettings {...this.state.settings} onSave={ this.saveSettings.bind(this) } />
    { this.getMain() }
    </div>;    
  }
}

export default App;