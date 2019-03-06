import React from 'react';
import LogoHeader from './LogoHeader';
import posed from 'react-pose';
import { Container, Button } from 'reactstrap';

const WelcomeWrapper = posed.div({
  out: {
    y: -500,
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
    this.state = { animation: null };
    this.onClick.bind(this);
  }

  onClick() {
    this.setState({ animation: "out" });
    setTimeout(this.props.onClick, 500);
  }

  render() {
    return <Container fluid className="text-center">
        <LogoHeader/>
        <Container>
        <WelcomeWrapper pose={this.state.animation}>
        <h1>Welcome</h1>
        <h3 className="mb-4">This game is really easy and fun to play.</h3>
        <Button size="lg" color="warning" onClick={ () => this.onClick() }>Play</Button>
        </WelcomeWrapper>
        </Container>
      </Container>;
  }
}

export default Welcome;