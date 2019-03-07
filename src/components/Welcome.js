import React from 'react';
import posed from 'react-pose';
import Tour from './Tour';
import { Container, Row, Col } from 'reactstrap';
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
    };
    this.onPressPlay = this.onPressPlay.bind(this);
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
  
  render() {

    if (this.state.showTour) return <Tour {...this.props} goPlay={ () => this.onPressPlay() } goHome={ () => this.showTour(false) } />;

    return <Container fluid className="welcome">
      <WelcomeWrapper1 pose={this.state.animation}>
        <LogoHeader size="large" />
      </WelcomeWrapper1>

      <Container>
        <Row>
          <Col xs={{ size: 5, offset: 1 }}>
            <WelcomeWrapper2 pose={this.state.animation}>
              { this.props.dataLoaded &&
                <a href="#" onClick={ () => this.onPressPlay() }><div className="img play">Play Now!</div></a>
              }
              { !this.props.dataLoaded &&
                <div className="img play">Loading...</div>
              }
            </WelcomeWrapper2>
          </Col>
          <Col xs={{ size: 5 }}>
            <WelcomeWrapper1 pose={this.state.animation}>
              
              { this.props.dataLoaded &&
                <a href="#" onClick={ () => this.showTour() }><div className="img tour">How To Play</div></a>
              }
              { !this.props.dataLoaded &&
                <div className="img tour">Loading...</div>
              }
              
            </WelcomeWrapper1>
          </Col>
        </Row>
        <h2 className="mt-4 pt-4">Pick a card, any card.</h2>
      </Container>
    </Container>;
  }
}

export default Welcome;