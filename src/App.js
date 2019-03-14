import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { addCard, setCardsReady, addZone, setMapsReady, setFactsMeta } from './redux/actions'

import ReactLoading from 'react-loading';

import Game from './Game';
import Welcome from './components/Welcome';
import Tour from './components/Tour';
import CardBrowser from './components/CardBrowser';
import Settings from './components/Settings';
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
      musicTrack: menumusic,
      sfxTrack: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.loadData = this.loadData.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.playSFX = this.playSFX.bind(this);
    this.sfxFinish = this.sfxFinish.bind(this);
  }
  
  componentDidMount() {
    this.loadData();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  loadData() {
    
    loadCardData(
      function (rowData) { // On Row
        this.props.addCard(rowData);
      }.bind(this),
      function (factMeta) { // On Complete
        this.props.setFactsMeta(factMeta);
        this.props.setCardsReady(true);
      }.bind(this),
      function(err, file, inputElem, reason) { // On Error
        console.log("Error", err);
      }
    )

    loadZoneData(
      function (rowData) { // On Row
        this.props.addZone(rowData);
      }.bind(this),
      function () { // On Complete
        this.props.setMapsReady(true);
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

  changeTrack(track) {
    this.setState({ musicTrack: track })
  }

  playSFX(sfx) {
    this.setState({ sfxTrack: sfx })
  }

  sfxFinish() {
    this.setState({ sfxTrack: null })
  }
  
 
  // <Settings />

  render() {
    if (this.props.areCardsReady && this.props.areMapsReady && this.props.areSoundsReady) return <Router>
      <div className="app">
        <Settings />
        <Route path="/" exact component={Welcome} />
        <Route path="/play" exact component={Game} />
        <Route path="/howto/" component={Tour} />
        <Route path="/cards/" component={CardBrowser} />
        <Route path="/map/" component={MapBrowser} />
      </div>
    </Router>; 
            
    // Not loaded yet
    return <div className="loading">
      <ReactLoading type="bars" className="spinner" color="white" height={'10%'} width={'10%'} />
    </div>;
  }
}

const mapStateToProps = state => { return {
  isSFXMuted: state.settings.muteSFX, 
  isMusicMuted: state.settings.muteMusic, 
  areCardsReady: state.cards.ready, 
  areMapsReady: state.maps.ready, 
  areSoundsReady: state.general.soundsReady,
  currentPage: state.general.page 
} };

const mapDispatchToProps = { addCard, setCardsReady, addZone, setMapsReady, setFactsMeta }

export default connect(mapStateToProps, mapDispatchToProps)(App);
