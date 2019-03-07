import React from 'react';
import head from '../res/head.png';
import {Container} from 'reactstrap';
import posed from 'react-pose';
import "./LogoHeader.css";

const LogoWrapper = posed.div({
  out: {
    y: -200,
    opacity: 0,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    y: 0,
    opacity: 1,
    transition: {
      default: { duration: 200 }
    }
  },
});

class LogoHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      animation: "out",
    };
  }

  componentDidMount() {
    this.setState({ animation: "in" });
  }

  render () {
    return <LogoWrapper pose={this.state.animation}>
    <Container className={ "logo " + this.props.size }>
    <img src={head} alt="The Ice Is Right - An Ice Flows Game"/>
    </Container>
    </LogoWrapper>;
  }

}

export default LogoHeader