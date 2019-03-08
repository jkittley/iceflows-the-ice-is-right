import React from 'react';
import posed from 'react-pose';
import LogoHeader from './LogoHeader';
import Map from './Map';
import { Container } from 'reactstrap';
import "./MapBrowser.css";

const MapBrowserWrapper = posed.div({
  out: {
    y: -500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    y: 0,
    opacity: 1,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

class MapBrowser extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      animation: "out",
      deck: [],
    };
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
  }

  goHome() {
    this.setState({ animation: "out" });
    setTimeout(this.props.goHome, 500);
  }

  render() {
    return <Container className="text-left">
        <MapBrowserWrapper pose={this.state.animation}>
        <LogoHeader />
        <div className="mapexplorer">
        <Map 
          zoneInfo={this.props.zoneInfo} 
          allowZoneSelect={true}
          allowZoom={false}
        />
        </div>
        </MapBrowserWrapper>
      </Container>;
  }
}

export default MapBrowser;