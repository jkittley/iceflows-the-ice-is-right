import React from 'react';
import posed from 'react-pose';
import Tour from './Tour';
import CardBrowser from './CardBrowser';
import { Container, Row, Col, Button} from 'reactstrap';
import LogoHeader from './LogoHeader';
import "./Welcome.css";

const WelcomeWrapper1 = posed.div({
  start: {
    x: -500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    x: 500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

const WelcomeWrapper2 = posed.div({
  start: {
    x: 500,
    opacity: 0,
    transition: {
      default: { duration: 10 }
    }
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    x: -500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      animation: "start",
      showTour: false,
      showBrowse: false,
    };
    this.onPressPlay = this.onPressPlay.bind(this);
    this.showBrowse = this.showBrowse.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
  }

  onPressPlay() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  showTour(setto=true) {
    if (setto) this.setState({ animation: "out" }); 
    else this.setState({ animation: "in" });
    setTimeout( () => this.setState({ showTour: setto }), 500);
  }

  showBrowse(setto=true) {
    if (setto) this.setState({ animation: "out" }); 
    else this.setState({ animation: "in" });
    setTimeout( () => this.setState({ showBrowse: setto }), 500);
  }
  
  render() {

    if (!this.props.dataLoaded) return <h1>Loading...</h1>
    if (this.state.showTour) return <Tour {...this.props} goPlay={ () => this.onPressPlay() } goHome={ () => this.showTour(false) } />;
    if (this.state.showBrowse) return <CardBrowser {...this.props} goHome={ () => this.showBrowse(false) } />;
    
    return <Container fluid className="welcome">
      <WelcomeWrapper1 pose={this.state.animation}>
        <LogoHeader size="large" />
      </WelcomeWrapper1>

      <Container>
        <Row>
          <Col xs={{ size: 3, offset: 2 }}>
            <WelcomeWrapper2 pose={this.state.animation}>
                <Button className="play" onClick={ () => this.onPressPlay() }><div>Play Now!</div></Button>
            </WelcomeWrapper2>
          </Col>
          <Col xs={{ size: 2 }}>
            <WelcomeWrapper1 pose={this.state.animation}>
                <Button  className="browse" onClick={ () => this.showBrowse() }><div>Browse Cards</div></Button>
            </WelcomeWrapper1>
          </Col>
          <Col xs={{ size: 3 }}>
            <WelcomeWrapper2 pose={this.state.animation}>
                <Button className="tour" onClick={ () => this.showTour() }><div>How To Play</div></Button>
            </WelcomeWrapper2>
          </Col>
        </Row>
        <h2 className="mt-4 pt-4">Pick a card, any card.</h2>
      </Container>
    </Container>;
  }
}

export default Welcome;