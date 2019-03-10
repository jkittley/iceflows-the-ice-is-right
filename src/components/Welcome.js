import React from 'react';
import posed from 'react-pose';
import { Container, Row, Col, Button} from 'reactstrap';
import LogoHeader from './LogoHeader';
import "./Welcome.css";

const LogoWrap = posed.div({
  start: {
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
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    y: -500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

const FootWrap = posed.div({
  start: {
    y: 500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    y: 0,
    delay: 500,
    opacity: 1,
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    y: 500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

const CardWrap1 = posed.div({
  start: {
    x: -500,
    opacity: 0,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    x: 0,
    opacity: 1,
    delay: 400,
    transition: {
      default: { duration: 300 }
    }
  },
  out: {
    x: -500,
    opacity: 0,
    transition: {
      default: { duration: 300 }
    }
  }
});

const CardWrap2 = posed.div({
  start: {
    x: 500,
    opacity: 0,
    transition: {
      default: { duration: 10 }
    }
  },
  in: {
    x: 0,
    delay: 600,
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

const CardWrap3 = posed.div({
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
    delay:600,
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
    this.onPagePick = this.onPagePick.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
  }

  onPagePick(p) {
    this.setState({ animation: "out" });
    setTimeout( () => this.props.onPagePick(p), 500);
  }

  render() {

    if (!this.props.dataLoaded) return <h1>Loading...</h1>

    return <Container fluid className="welcome">
      <LogoWrap pose={this.state.animation}>
        <LogoHeader size="large" />
      </LogoWrap>

      <Container>
        <Row>
          <Col xl={{ size: 2, offset: 1 }} md={{ size: 2 }} sm={{ size: 6 }} style={{ zIndex: 5000 }}>
            <CardWrap1 pose={this.state.animation}>
                <Button className="play" onClick={ () => this.onPagePick("game") }><div>Play Now!</div></Button>
            </CardWrap1>
          </Col>
          <Col md={{ size: 2 }} sm={{ size: 6 }}>
            <CardWrap3 pose={this.state.animation}>
                <Button className="tour" onClick={ () => this.onPagePick("tour") }><div>How To Play</div></Button>
            </CardWrap3>
          </Col>

          <Col md={{ size: 2, offset: 2 }} sm={{ size: 6 }}>
            <CardWrap2 pose={this.state.animation}>
                <Button  className="browse" onClick={ () => this.onPagePick("browse") }><div>Browse Cards</div></Button>
            </CardWrap2>
          </Col>
          <Col md={{ size: 2 }} sm={{ size: 6 }}>
            <CardWrap2 pose={this.state.animation}>
                <Button  className="map" onClick={ () => this.onPagePick("map") }><div>Map Explorer</div></Button>
            </CardWrap2>
          </Col>

        </Row>
        <FootWrap pose={this.state.animation}>
        <h2 className="mt-4 pt-4">Pick a card, any card.</h2>
        </FootWrap>
        
      </Container>
    </Container>;
  }
}

export default Welcome;