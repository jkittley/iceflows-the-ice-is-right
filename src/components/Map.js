import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import SVG from 'react-inlinesvg';
import { FaSearch, FaCaretRight } from 'react-icons/fa';
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
      zones: [
        { id: "b1", title: "Zone name b1", highlight: false },
        { id: "b2", title: "Zone name b2", highlight: false },
        { id: "b3", title: "Zone name b3", highlight: false }
      ],
    };
    // Init the active layer
    this.state.activeLayer = this.state.layers[this.state.layerOrder[0]];
    // Bindings
    this.selectLayer = this.selectLayer.bind(this);
    this.toggleLayer = this.toggleLayer.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    // Refs
    this.overlayRef = React.createRef();
    this.mapRef = React.createRef();
  }

  componentDidMount() {
  }

  myOnLoadHandler() {
    if (this.props.initZone) this.selectZone(this.props.initZone);
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
    console.log(zoneId);
    if (deselectOthers) {
      var currentlyHighlighted = this.overlayRef.current.querySelectorAll("path.highlight");
      Array.from(currentlyHighlighted).forEach( (pathElem) => pathElem.classList.remove("highlight") );
    }
    var element = document.getElementById(zoneId+"___"+this.props.uid);
    if (element) element.classList.add("highlight");
  }

  toggleZoom() {
    this.mapRef.current.classList.toggle("zoom");
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
          <Button color="info" onClick={this.toggleZoom}><FaSearch/></Button>
          <Button color="success" onClick={this.toggleLayer}>{ this.state.activeLayer ? this.state.activeLayer.title : "Change"} <FaCaretRight/></Button>
        </ButtonGroup>
      </div>

    </div>;
  }
}


Map.defaultProps = {
  uid: uuidv4(),
  round: false,
}

export default Map