import React from 'react';
import Game from './Game';
import Welcome from './components/Welcome';
import Tour from './components/Tour';
import CardBrowser from './components/CardBrowser';
import Settings from './components/Settings';
import SoundSettings from './components/SoundSettings';
import MusicPlayer from './components/MusicPlayer';
import MapBrowser from './components/MapBrowser';
import {loadCardData,loadZoneData} from './DataLoaders';

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
      page: null,   
      dataLoaded: false,
      cards: [], 
      mounted: false,
      settings: {
        showFacts: ['fact_fast_flow','fact_max_thick','fact_mean_thick','fact_thick_in_fast_flow'],
        muteSFX: false,
        muteMusic: true,
      },
      factMeta: {},
      zoneInfo: {},
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.loadData = this.loadData.bind(this);
    this.pickPage = this.pickPage.bind(this);
  }
  
  componentDidMount() {
    this.loadData();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    setTimeout( () => this.setState({ mounted: true }), 200);
  }

  loadData() {
    
    loadCardData(
      function (rowData) { // On Row
        this.setState({ cards: [...this.state.cards, rowData ]});
      }.bind(this),
      function (meta) { // On Complete
        this.setState({ factMeta: meta, dataLoaded: true });
      }.bind(this),
      function(err, file, inputElem, reason) { // On Error
        console.log("Error", err);
      }
    )

    loadZoneData(
      function (rowData) { // On Row
        this.setState({ zoneInfo: { ...this.state.zoneInfo, ...rowData } });
      }.bind(this),
      function (meta) { // On Complete
        console.log("Zones", this.state.zoneInfo);
      }.bind(this),
      function(err, file, inputElem, reason) { // On Error
        console.log("Error", err);
      }
    )


  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  pickPage(page=null) {
    console.log(page);
    this.setState({ page: page });
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
    // if (this.state.width < 800 || this.state.height < 600) return <ScreenTooSmall settings={this.state.settings}/>;

    if (this.state.page === "game")   return <Game        cards={this.state.cards} settings={this.state.settings} zoneInfo={this.state.zoneInfo} exitGame={ this.pickPage } />;
    if (this.state.page === "tour")   return <Tour        cards={this.state.cards} settings={this.state.settings} goHome={ this.pickPage } goPlay={ () => this.pickPage("game") } />;
    if (this.state.page === "browse") return <CardBrowser cards={this.state.cards} settings={this.state.settings} goHome={ () => this.pickPage(null) } />;
    if (this.state.page === "map")    return <MapBrowser  zoneInfo={this.state.zoneInfo} settings={this.state.settings} goHome={ () => this.pickPage(null) } />;

    return <Welcome cards={this.state.cards} dataLoaded={this.state.dataLoaded} settings={this.state.settings} onPagePick={ this.pickPage }/>
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