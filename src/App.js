import React from 'react';
import { connect } from 'react-redux';
import { addCard, setCardsReady, addZone, setMapsReady, setFactsMeta, addError, setMusic } from './redux/actions';

import ReactLoading from 'react-loading';

import Game from './Game';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import Tour from './components/Tour';
import CardBrowser from './components/CardBrowser';
import CardPrint from './components/CardPrint';
import Settings from './components/Settings';
import MapBrowser from './components/MapBrowser';

import {loadCardData,loadZoneData} from './DataLoaders';
import './App.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.main = this.main.bind(this);
  }
  
  componentDidMount() {
    this.loadData();
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
        this.props.addError("failed to load card data", { reason: reason, file: file });
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
        this.props.addError("failed to load zone data", { reason: reason, file: file });
      }
    )
  }

  main() {
    if (this.props.errors.length > 0) return <ErrorMessage />;
    if (this.props.currentPage === "game") return <Game />;
    if (this.props.currentPage === "tour") return <Tour />;
    if (this.props.currentPage === "card") return <CardBrowser />;
    if (this.props.currentPage === "maps") return <MapBrowser />;
    if (this.props.currentPage === "print") return <CardPrint />;
    return <Welcome />;
  }

  render() {
    if (this.props.areCardsReady && this.props.areMapsReady && this.props.isSoundManagerReady && this.props.areSoundsLoaded) return <div className="app">
        <Settings />
        { this.main() }
    </div>; 
            
    // Not loaded yet
    return <div className="loading">
      <ReactLoading type="bars" className="spinner" color="white" height={'10%'} width={'10%'} />
    </div>;
  }
}

const mapStateToProps = state => { return {
  errors: state.general.errors,
  isSFXMuted: state.settings.muteSFX, 
  isMusicMuted: state.settings.muteMusic, 
  areCardsReady: state.cards.ready, 
  areMapsReady: state.maps.ready, 
  isSoundManagerReady: state.general.soundManagerReady,
  areSoundsLoaded: state.general.soundsLoaded,
  currentPage: state.general.page 
}};

const mapDispatchToProps = { addError, addCard, setCardsReady, addZone, setMapsReady, setFactsMeta, setMusic }

export default connect(mapStateToProps, mapDispatchToProps)(App);
