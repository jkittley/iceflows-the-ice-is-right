
import React from 'react';
import { Button, Modal, ModalHeader, ButtonGroup, ModalBody, ModalFooter, FormGroup, Col, Label, Input, UncontrolledTooltip } from 'reactstrap';
import { FaCog, FaDrum, FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
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
      showFacts: props.showFacts,
      animation: "hidden"
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "visible" }), 200 );
  }

  toggleModal() {
    this.setState({ 
      visible: !this.state.visible,
      showFacts: this.props.showFacts
    });
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

  save() {
    this.toggleModal();
    if (this.props.onSave) this.props.onSave({
      showFacts: this.state.showFacts
    });
  }

  selectFact(fact, checked) {
    if (checked) {
      this.setState({ showFacts: [ ...this.state.showFacts, fact.id ]})
    } else {
      this.setState({ showFacts: this.state.showFacts.filter((f) => f !== fact.id) })
    }
  }

  render() {
    return <SettingsWrap pose={this.state.animation}>
      <div className="settingsPane">
        
        <ButtonGroup size="lg" vertical>
          
          <Button size="lg" color="warning" onClick={ () => this.toggleModal() }><FaCog/></Button>

          <Button className="d-none d-lg-inline" id="btn-mute-all" onClick={ () => this.toggleMuteAll() } color="light">
            { this.props.muteMusic && this.props.muteSFX ? <FaVolumeMute color="#ccc" /> : <FaVolumeUp/> }
          </Button>
          <UncontrolledTooltip placement="left" target="btn-mute-all">
            { this.props.muteMusic && this.props.muteSFX ? "UnMute" : "Mute" } All Sounds
          </UncontrolledTooltip>
          
          <Button id="btn-mute-music" onClick={this.toggleMusic.bind(this)} color="light" >
            <FaMusic color={ this.props.muteMusic ? "#ccc" : "black" }/>
          </Button>
          <UncontrolledTooltip placement="left" target="btn-mute-music">
            { !this.props.muteMusic ? "Mute" : "UnMute" } Music
          </UncontrolledTooltip>
            
          <Button id="btn-mute-sfx" onClick={this.toggleSFX.bind(this)} color="light">
            <FaDrum  color={ this.props.muteSFX ? "#ccc" : "black" }/>
          </Button>
          <UncontrolledTooltip placement="left" target="btn-mute-sfx">
            { !this.props.muteSFX ? "Mute" : "UnMute" } Sound Effects
          </UncontrolledTooltip>

        </ButtonGroup>
      </div>
      
   <Modal isOpen={this.state.visible}>
      <ModalHeader toggle={ this.toggleModal }>Settings</ModalHeader>
      <ModalBody>
      <h5>Show Facts</h5>  
      { Object.keys(this.props.factMeta).map(function(key, i) {
        var meta = this.props.factMeta[key];
        var selected = this.props.showFacts.indexOf(meta.id) >= 0; 
        return (
          <Col key={i} sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" defaultChecked={selected} onChange={ (e) => this.selectFact(meta, e.target.checked) } />{' '} {meta.title}
              </Label>
            </FormGroup>
          </Col>);
        }.bind(this))
      }

      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={ this.toggleModal }>Cancel</Button>{' '}
        <Button color="primary" onClick={ () => this.save() }>Save</Button>{' '}
      </ModalFooter>
      </Modal></SettingsWrap>;
    
  }
}

export default Settings;
