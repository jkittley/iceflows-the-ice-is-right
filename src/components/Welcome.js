import React from 'react';
import posed from 'react-pose';
import Tour from './Tour';
import { Container, Button, Row, Col } from 'reactstrap';

const WelcomeWrapper1 = posed.div({
  out: {
    x: 1500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

const WelcomeWrapper2 = posed.div({
  out: {
    x: -1500,
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
      animation: null,
      showTour: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  showTour(setto=true) {
    this.setState({ showTour: setto });
  }
  
  render() {

    if (this.state.showTour) return <Tour {...this.props} goPlay={ () => this.onClick() } goHome={ () => this.showTour(false) } />;

    return <Container fluid className="text-left">
        <Container>
        <h1 className="display-3 mb-4">Welcome</h1>
        <Row className="mt-4">         

          <Col xs="6">
           <WelcomeWrapper2 pose={this.state.animation}>
           <div className="bg-white rounded p-4 m-0">
            { this.props.dataLoaded &&
              <Button block size="lg" color="warning" className="my-2" onClick={ () => this.onClick() }>Play The Ice Is Right!</Button>
            }
            { !this.props.dataLoaded &&
              <Button block size="lg" color="warning" outline className="my-2">One minute, loading...</Button>
            }
            </div>
            </WelcomeWrapper2>
          </Col>

          <Col xs="6">
          <WelcomeWrapper1 pose={this.state.animation}>
            <div className="bg-white rounded p-4">
            { this.props.dataLoaded &&
              <Button block size="lg" color="info" className="my-2" onClick={ () => this.showTour() }>How To Play</Button>
            }
            { !this.props.dataLoaded &&
              <Button block size="lg" color="info" outline className="my-2">One minute, loading...</Button>
            }
            </div>
          </WelcomeWrapper1>
          </Col>
        </Row>
        </Container>
      </Container>;
  }
}

export default Welcome;