import React from 'react';
import { connect } from 'react-redux'
import posed from 'react-pose';
import { sfx, setMusic, gotoPage } from "../redux/actions";

import { Container, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
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
      ackModal: false,
    };
    this.onPagePick = this.onPagePick.bind(this);
    this.toggleAckModal = this.toggleAckModal.bind(this);
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "in" }), 500);
  }

  onPagePick(page) {
    this.setState({ animation: "out" });
    this.props.sfx("ping");
    setTimeout( () => this.props.gotoPage(page), 500);
  }

  toggleAckModal() {
    this.setState({ ackModal: !this.state.ackModal })
  }

  render() {

    return <Container className="welcome">
      <LogoWrap pose={this.state.animation}>
        <LogoHeader size="large" />
      </LogoWrap>

        <Row style={{ marginTop: "30px" }}>
          <Col xl={{ size: 2, offset: 1 }} md={{ size: 2 }} sm={{ size: 6 }} style={{ zIndex: 500 }}>
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
                <Button  className="browse" onClick={ () => this.onPagePick("card") }><div>Browse Cards</div></Button>
            </CardWrap2>
          </Col>
          <Col md={{ size: 2 }} sm={{ size: 6 }}>
            <CardWrap2 pose={this.state.animation}>
                <Button className="map" onClick={ () => this.onPagePick("maps") }><div>Map Explorer</div></Button>
            </CardWrap2>
          </Col>

        </Row>
        <FootWrap pose={this.state.animation}>
        <h2 className="pick-a-card mt-4 pt-4">Pick a card, any card.</h2>
        </FootWrap>

        <Modal isOpen={this.state.ackModal} toggle={this.toggleAckModal}>
          <ModalHeader toggle={this.toggle}>Acknowledgements</ModalHeader>
          <ModalBody>
            <p>Ice Flows, the Ice is Right was developed by Anne Le Brocq at the University of Exeter in collaboration with <a href="http://kittley.com/" rel="noopener noreferrer" target="_blank">Kittley Ltd</a>.
            </p>

            <h5>Datasets and Information</h5>
            <ul>
              <li><a href="https://www.bas.ac.uk/project/bedmap-2/" rel="noopener noreferrer" target="_blank">BEDMAP2 dataset</a></li>
              <li><a href="https://nsidc.org/data/measures" rel="noopener noreferrer" target="_blank">Measures ice velocity & drainage basins</a></li>
            </ul>
            <h5>Audio Assets</h5>
            <ul>
              <li><a href="http://www.freeSounds.org" rel="noopener noreferrer" target="_blank">FreeSound.org</a></li>
              <li><a href="http://www.freesfx.co.uk" rel="noopener noreferrer" target="_blank">freesfx.co.uk</a></li>
            </ul>
            <h5>Font and Artwork</h5>
            <ul>
              <li><a href="https://c7n1.me/category/playsir-2/" rel="noopener noreferrer" target="_blank"> Situjuh Nazara</a></li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleAckModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        
        <div className="copyright"> 
        <FootWrap pose={this.state.animation}>
        <Row>
          <Col>
            <p className="mb-1">Created by</p>
            <a href="https://www.exter.ac.uk/" rel="noopener noreferrer" target="_blank">
              <img src={require('../res/exeter-dark.png')} alt="University of Exeter" className="img-fluid pt-2" />
            </a>
          </Col>
          <Col>
          {/* <Button onClick={ () => this.props.sfx("win") } >SFX Win</Button>
          <Button onClick={ () => this.props.sfx("loose") } >SFX Loose</Button>
          <Button onClick={ () => this.props.setMusic("game") } >Game Music</Button>
          <Button onClick={ () => this.props.setMusic("menu") } >Menu Music</Button> */}

          <p className="text-center mt-2">&copy; University of Exeter 2019 | Anne Le Brocq</p>
          <p className="text-center pb-2">
            <a href="/privacypolicy.html">Privacy Policy / Terms of Use</a> | {' '}
            <button className="discrete" onClick={ this.toggleAckModal.bind(this) }>Acknowledgements</button>
          </p>
          </Col>
          <Col>
            <p className="mb-1">Game Development</p>
            <a href="http://www.kittley.com/" rel="noopener noreferrer" target="_blank">
              <img src={require('../res/kittley.png')} alt="Kittley.com" className="img-fluid align-self-center" />
            </a>
          </Col>
          </Row>
          </FootWrap>
        </div>
        
        
    </Container>;
  }
}

const mapDispatchToProps = { sfx, setMusic, gotoPage }

export default connect(null, mapDispatchToProps)(Welcome);
