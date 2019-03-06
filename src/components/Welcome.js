import React from 'react';
import LogoHeader from './LogoHeader';
import posed from 'react-pose';
import MusicPlayer from './MusicPlayer';
import { Container, Button, Row, Col } from 'reactstrap';

const WelcomeWrapper1 = posed.div({
  out: {
    x: -1500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  }
});

const WelcomeWrapper2 = posed.div({
  out: {
    x: 1500,
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
    };
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  render() {
    var hostPath = require('../res/host.png');
    var examplePath = require('../res/example.png');
    var welcomeSound = require('../res/sounds/welcome.wav');
    return <Container fluid className="text-left">
        <LogoHeader/>
        <Container>
        <Row className="mt-4">
          <Col xs="4">
          <WelcomeWrapper1 pose={this.state.animation}>
            <img src={hostPath} alt="The host with the most"/>
            <MusicPlayer url={welcomeSound} muted={this.props.settings.muteSFX } showControls/>
          </WelcomeWrapper1>
          </Col>
          <Col xs="8">
           <WelcomeWrapper2 pose={this.state.animation}>
            <div className="bg-white p-4 rounded">
              <h1 className="display-4 mb-4">Welcome</h1>
              <h3 className="mb-2 lead">What's your name and where do you come from?</h3>
              <h3 className="mb-2 lead">Ok, great. Now, the rules of the game are very simple.</h3>
              <h3 className="mb-2 lead">I have a deck of cards here. Each card in the deck has a list of facts about a particular place in Antarctica 
              e.g. the amount of snow that falls in summer is 50m.</h3>
              
              <img src={examplePath} className="img-fluid" alt="Example Cards"/>

              <h3 className="mb-2 lead">I'm going to turn over the first card and I want you to pick a fact.</h3>
              <h3 className="mb-2 lead">Then I want you to guess if the same fact on the next card will nave a higher or lower value.</h3>
              <h3 className="mb-2 lead">For every correct guess you get 100 points, for every wrong guess you loose 50 points.</h3>
              <h3 className="lead">Are you ready?</h3>
            </div>
            { this.props.dataLoaded &&
            <Button block size="lg" color="warning" className="mt-2 mb-4" onClick={ () => this.onClick() }>Then let's Play The Ice Is Right!</Button>
            }
            { !this.props.dataLoaded &&
            <Button block size="lg" color="warning" outline className="mt-2 mb-4">One minute, loading...</Button>
            }
            </WelcomeWrapper2>
          </Col>
        </Row>
        </Container>
      </Container>;
  }
}

export default Welcome;