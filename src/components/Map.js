import React from 'react';
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
      layers: {
        "icedepth": { id: "icedepth", title: "Ice Depth", image: require('../res/maps/layer_icedepth.jpg') },
        "bedelev" : { id: "bedelev", title: "Bed Elevation", image: require('../res/maps/layer_bedelevation.jpg') },
      },
      layerOrder: ["icedepth", "bedelev"],
      activeLayer: null,
      activeZone: null,
      showInfoPane: this.props.infoOpen,
    };
    // Init the active layer
    this.state.activeLayer = this.state.layers[this.state.layerOrder[0]];
    // Bindings
    this.selectLayer = this.selectLayer.bind(this);
    this.toggleLayer = this.toggleLayer.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    this.onBasinOver = this.onBasinOver.bind(this);
    this.showZoneInfo = this.showZoneInfo.bind(this);
    // Refs
    this.overlayRef = React.createRef();
    this.mapRef = React.createRef();
  }

  onBasinOver(zoneId) {
    if (this.props.allowZoneSelect) {
      console.log(zoneId);
      this.selectZone(zoneId);
    }
  }

  myOnLoadHandler() {
    if (this.props.initZone) this.selectZone(this.props.initZone);
    
    if (this.props.zoneInfo && this.props.allowZoneSelect) {
      Object.keys(this.props.zoneInfo).forEach( (zoneId) => { 
        var element = document.getElementById(zoneId+"___"+this.props.uid);
        element.addEventListener("mousedown", () => this.onBasinOver(zoneId), false);
        element.classList.add("hand");
      });
    }
  }

  toggleLayer() {
    var i = this.state.layerOrder.indexOf(this.state.activeLayer.id);
    var n = i+1;
    if (n >= this.state.layerOrder.length) n = 0;
    this.selectLayer(this.state.layerOrder[n]);
  }

  selectLayer(key) {
    console.log(key);
    this.setState({ activeLayer: this.state.layers[key] });
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
    return <div id={this.props.uid} className={"map" + (this.props.round ? " round" : "") } ref={this.mapRef}>

      { Object.keys(this.state.layers).map( function(k, i) { 
        var isVisible = this.state.layers[k] === this.state.activeLayer;
        return <div className="layer" key={uuidv4()} style={{ opacity: isVisible ? 1 : 0, backgroundImage: "url(" + this.state.layers[k].image + ")" }}></div>;
      }.bind(this))}
  
      <div className="overlay" ref={this.overlayRef}>
        <SVG
          src={overlayImg}
          uniquifyIDs={true}
          uniqueHash={this.props.uid}
          preloader={<h1>Loading</h1>}
          onLoad={(src) => this.myOnLoadHandler(src) }>
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
  zoneInfo: false,
  allowZoom: true,
  allowZoneSelect: false,
  infoOpen: false,
}

export default Map