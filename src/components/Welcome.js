import React from 'react';
import posed from 'react-pose';
import Tour from './Tour';
import { Container, Button } from 'reactstrap';
import LogoHeader from './LogoHeader';
import "./Welcome.css";

const WelcomeWrapper1 = posed.div({
  start: {
    x: -1500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    x: 0,
    opacity: 1,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
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
  start: {
    x: 1500,
    opacity: 0,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
  in: {
    x: 0,
    opacity: 1,
    delay: 100,
    transition: {
      default: { duration: 300 }
    }
  },
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
      animation: "start",
      showTour: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
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

    return <Container fluid className="welcome">

          <WelcomeWrapper1 pose={this.state.animation}>
          <LogoHeader size="large" />
          </WelcomeWrapper1>
          
           <WelcomeWrapper2 pose={this.state.animation}>
           <div class="img play">           
            { this.props.dataLoaded &&
              <Button block size="lg" color="light" outline className="my-2" onClick={ () => this.onClick() }>Play The Ice Is Right!</Button>
            }
            { !this.props.dataLoaded &&
              <Button block size="lg" color="light" outline className="my-2">One minute, loading...</Button>
            }
            </div>
            </WelcomeWrapper2>
        
          <WelcomeWrapper1 pose={this.state.animation}>
            <div class="img tour mt-4">
            { this.props.dataLoaded &&
              <Button block size="lg" color="light" outline className="my-2" onClick={ () => this.showTour() }>How To Play</Button>
            }
            { !this.props.dataLoaded &&
              <Button block size="lg" color="light" outline className="my-2">One minute, loading...</Button>
            }
            </div>
          </WelcomeWrapper1>
        
      </Container>;
  }
}

export default Welcome;