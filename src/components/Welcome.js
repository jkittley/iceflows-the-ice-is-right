import React from 'react';
import LogoHeader from './LogoHeader';
import { Container, Button } from 'reactstrap';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <Container className="text-center">
      <LogoHeader/>
      <h1>Welcome</h1>
      <h3 className="mb-4">This game is really easy and fun to play.</h3>
      <Button size="lg" color="warning" onClick={this.props.onClick}>Play</Button>
    </Container>;
  }
}

export default Welcome;