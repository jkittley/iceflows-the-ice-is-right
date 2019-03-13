import React from 'react';
import Game from './Game';
import Welcome from './components/Welcome';
import Tour from './components/Tour';
import CardBrowser from './components/CardBrowser';
import Settings from './components/Settings';
import MusicPlayer from './components/MusicPlayer';
import MapBrowser from './components/MapBrowser';
import menumusic from './res/sounds/menumusic.wav';
import {loadCardData,loadZoneData} from './DataLoaders';
import './App.css';

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
        showFacts: ['fact_fast_flow','fact_mean_thick', 'fact_min_gl_bed','fact_per_bed','fact_pot_sea_level'],
        muteSFX: false,
        muteMusic: false,
      },
      factMeta: {},
      zoneInfo: {},
      musicTrack: menumusic,
      sfxTrack: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.loadData = this.loadData.bind(this);
    this.pickPage = this.pickPage.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.playSFX = this.playSFX.bind(this);
    this.sfxFinish = this.sfxFinish.bind(this);
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

    if (this.state.page === "game")   return <Game        cards={this.state.cards} settings={this.state.settings} playSFX={this.playSFX} zoneInfo={this.state.zoneInfo} exitGame={ this.pickPage } changeTrack={this.changeTrack } />;
    if (this.state.page === "tour")   return <Tour        cards={this.state.cards} settings={this.state.settings} goHome={ this.pickPage } goPlay={ () => this.pickPage("game") } />;
    if (this.state.page === "browse") return <CardBrowser cards={this.state.cards} settings={this.state.settings} goHome={ () => this.pickPage(null) } />;
    if (this.state.page === "map")    return <MapBrowser  zoneInfo={this.state.zoneInfo} settings={this.state.settings} goHome={ () => this.pickPage(null) } />;

    return <Welcome cards={this.state.cards} dataLoaded={this.state.dataLoaded} settings={this.state.settings} onPagePick={ this.pickPage }/>
  }

  changeTrack(track) {
    this.setState({ musicTrack: track })
  }

  playSFX(sfx) {
    this.setState({ sfxTrack: sfx })
  }

  sfxFinish() {
    this.setState({ sfxTrack: null })
  }
  

  render() {
    if (this.state.mounted===false) return <div className="loading"><h1>Loading...</h1></div>;
    return <div className="app">
  
    <MusicPlayer url={this.state.musicTrack} muted={this.state.settings.muteMusic } autoPlay autoResume loop />
    <MusicPlayer url={this.state.sfxTrack} muted={this.state.settings.muteSFX } on autoPlay callbackFinish={this.sfxFinish} /> 
    <Settings {...this.state.settings} factMeta={this.state.factMeta} onSave={ this.saveSettings.bind(this) } />
    { this.getMain() }
    </div>;    
  }
}

export default App;