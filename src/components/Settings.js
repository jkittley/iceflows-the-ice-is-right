
import React from 'react';
import { connect } from 'react-redux'

import { updSettings, updFactMeta, toggleMuteSFX, toggleMuteMusic } from '../redux/actions'
import { Button, Modal, ModalHeader, ButtonGroup, ModalBody, ModalFooter, ListGroup, ListGroupItem, UncontrolledTooltip } from 'reactstrap';
import { FaCog, FaDrum, FaMusic, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import posed from 'react-pose';
import './Settings.css';

const SettingsWrap = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 200 }
  },
  visible: {
    opacity: 1,
    transition: { duration: 200 }
  }
});

class Settings extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      animation: "hidden"
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "visible" }), 200 );
  }

  toggleModal() {
    this.setState({ visible: !this.state.visible });
  }

  toggleMuteAll() {
    var newState = !(this.props.muteSFX && this.props.muteMusic)
    this.props.onSave({ 
      muteMusic: newState, 
      muteSFX: newState
    });
  }

  toggleSFX() {
    this.props.onSave({muteSFX: !this.props.muteSFX});
  }

  toggleMusic() {
    this.props.onSave({muteMusic: !this.props.muteMusic});
  }

  selectFact(fact, checked) {
    var changes =  { selected: checked };
    this.props.updFactMeta(fact.id, changes);
  }

  render() {
    return <SettingsWrap pose={this.state.animation}>
      <div className="settingsPane">
        
        <ButtonGroup size="lg" vertical>
          
          <Button size="lg" color="warning" onClick={ () => this.toggleModal() }><FaCog/></Button>

          <Button id="btn-mute-music" onClick={ this.props.toggleMuteMusic } color="light" >
            <FaMusic color={ this.props.isMusicMuted ? "#ccc" : "black" }/>
          </Button>
          <UncontrolledTooltip placement="left" target="btn-mute-music">
            { !this.props.isMusicMuted ? "Mute" : "UnMute" } Music
          </UncontrolledTooltip>
            
          <Button id="btn-mute-sfx" onClick={ this.props.toggleMuteSFX } color="light">
            <FaDrum  color={ this.props.isSFXMuted ? "#ccc" : "black" }/>
          </Button>
          <UncontrolledTooltip placement="left" target="btn-mute-sfx">
            { !this.props.isSFXMuted ? "Mute" : "UnMute" } Sound Effects
          </UncontrolledTooltip>

        </ButtonGroup>
      </div>
      
   <Modal isOpen={this.state.visible}>
      <ModalHeader toggle={ this.toggleModal }>Card Facts</ModalHeader>
      <ListGroup>
      { this.props.factsMeta.map( (fact) => {
        return <ListGroupItem key={fact.id} className="hand" onClick={ () => this.selectFact(fact, !fact.selected) } >
        { fact.selected ? <FaRegCheckCircle/> : <FaRegCircle/> } 
        {' '}{fact.title}{' ('}{fact.unit}{')'}
        </ListGroupItem>;
      }) }
      </ListGroup>
     
      <ModalFooter>
        <Button color="secondary" onClick={ this.toggleModal }>Close</Button>{' '}
      </ModalFooter>
      </Modal></SettingsWrap>;
    
  }
}

const mapStateToProps = state => { return { 
  isSFXMuted: state.settings.muteSFX, 
  isMusicMuted: state.settings.muteMusic, 
  getSettings: state.settings, 
  factsMeta: state.cards.factsMeta 
}};

const mapDispatchToProps = { updSettings, updFactMeta, toggleMuteSFX, toggleMuteMusic }

export default connect(mapStateToProps, mapDispatchToProps)(Settings);