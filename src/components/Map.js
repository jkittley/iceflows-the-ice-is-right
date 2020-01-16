import React from 'react';
import { connect } from 'react-redux';
import { setDefaultLayer } from '../redux/actions';
import { Button, ButtonGroup } from 'reactstrap';
import SVG from 'react-inlinesvg';
import { FaSearch, FaCaretRight, FaInfo } from 'react-icons/fa';
import overlayImg from '../res/maps/overlay.svg';
import "./Map.css";

const uuidv4 = require('uuid/v4');

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      activeLayer: this.props.initLayer,
      activeZone: null,
      showInfoPane: this.props.infoOpen,
    };    

    // Bindings
    this.selectLayer = this.selectLayer.bind(this);
    this.toggleLayer = this.toggleLayer.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    this.onZoneClick = this.onZoneClick.bind(this);
    this.showZoneInfo = this.showZoneInfo.bind(this);
    // Refs
    this.overlayRef = React.createRef();
    this.mapRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.initLayer !== prevProps.initLayer && this.props.initLayer !== this.state.activeLayer.id) {
      this.setState({ activeLayer: this.props.layers[this.props.initLayer.id] });
    }
    if (this.props.initZone !== prevProps.initZone && this.props.initZone !== this.state.activeZone) {
      this.selectZone(this.props.initZone);
    }
  }

  onZoneClick(zoneId) {
    if (this.props.allowZoneSelect) this.selectZone(zoneId);
  }

  onOverlayLoad() {
    if (this.props.initZone !== null) this.selectZone(this.props.initZone);

    if (this.props.zoneInfo && this.props.allowZoneSelect) {
      Object.keys(this.props.zoneInfo).forEach( (zoneId) => { 
        var element = document.getElementById(zoneId+"___"+this.props.uid);
        element.addEventListener("mousedown", () => this.onZoneClick(zoneId), false);
        element.classList.add("hand");
      });
    }
  }

  toggleLayer() {
    var i = this.props.layerOrder.indexOf(this.state.activeLayer.id);
    var n = i+1;
    if (n >= this.props.layerOrder.length) n = 0;
    this.selectLayer(this.props.layerOrder[n]);
  }

  selectLayer(key) {
    this.props.setDefaultLayer(key);
    this.setState({ activeLayer: this.props.layers[key] });
  }
  
  selectZone (zoneId, deselectOthers=true) {
    if (deselectOthers) {
      var currentlyHighlighted = this.overlayRef.current.querySelectorAll("path.highlight");
      Array.from(currentlyHighlighted).forEach( (pathElem) => pathElem.classList.remove("highlight") );
    }
    var element = document.getElementById(zoneId+"___"+this.props.uid);
    if (element) {
      element.classList.add("highlight");
      this.setState({  activeZone: zoneId });
    }
  }

  toggleZoom() {
    this.mapRef.current.classList.toggle("zoom");
  }

  showZoneInfo() {
    this.setState({ showInfoPane: !this.state.showInfoPane });
  }

  render () {

    if (this.props.basic === true) {
      console.log("YA BASIC");
      let imgPath = "";
      Object.keys(this.props.layers).map( function(k, i) { 
        var isVisible = this.props.layers[k] === this.state.activeLayer;
        console.log("YA BASIC", isVisible);
        if (isVisible) imgPath = this.props.layers[k].image;
      }.bind(this));
      return <img src={imgPath} alt="Map" />;
    }

    return <div id={this.props.uid} className={"map" + (this.props.round ? " round" : "") } ref={this.mapRef}>

      { Object.keys(this.props.layers).map( function(k, i) { 
        var isVisible = this.props.layers[k] === this.state.activeLayer;
        return <div className="layer" key={uuidv4()} style={{ opacity: isVisible ? 1 : 0, backgroundImage: "url(" + this.props.layers[k].image + ")" }}></div>;
      }.bind(this))}
  
      <div className="overlay" ref={this.overlayRef}>
        <SVG
          src={overlayImg}
          uniquifyIDs={true}
          uniqueHash={this.props.uid}
          preloader={<h1>Loading</h1>}
          onLoad={(src) => this.onOverlayLoad(src) }>
        </SVG>
      </div>

      <div className="controls">
        <ButtonGroup size="sm">
        { this.props.allowZoom && <Button color="info" onClick={this.toggleZoom}><FaSearch/></Button> }
          <Button color="success" onClick={this.toggleLayer}>{ this.state.activeLayer ? this.state.activeLayer.title : "Change"} <FaCaretRight/></Button>
        </ButtonGroup>
        { this.props.zoneInfo && this.state.activeZone && this.props.zoneInfo[this.state.activeZone] && 
          <Button className="ml-1" color={ this.state.showInfoPane ? "warning" : "dark" } size="sm" onClick={this.showZoneInfo}><FaInfo/></Button> 
        }
      </div>
      
      { this.props.zoneInfo && this.state.activeZone && this.props.zoneInfo[this.state.activeZone] && 
      <div className={ "infoPane" + (this.state.showInfoPane ? "" : " d-none") }>
      <h3>{this.props.zoneInfo[this.state.activeZone].title} ({this.props.zoneInfo[this.state.activeZone].zoneId})</h3>
      <p>{this.props.zoneInfo[this.state.activeZone].desc}</p>
      </div>
      }

    </div>;
  }
}


Map.defaultProps = {
  uid: uuidv4(),
  round: false,
  allowZoom: true,
  allowZoneSelect: false,
  infoOpen: false,
  initZone: null,
  basic: false
}

const mapStateToProps = (state) => ({
  layers: state.maps.layers,
  initLayer: state.maps.layers[state.maps.defaultLayer],
  layerOrder: state.maps.layerOrder,
  zoneInfo: state.maps.zones,
});

const mapDispatchToProps = { setDefaultLayer }
export default connect(mapStateToProps, mapDispatchToProps)(Map);