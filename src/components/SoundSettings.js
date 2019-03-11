
import React from 'react';
import { Button, ButtonGroup, UncontrolledTooltip } from 'reactstrap';
import { FaVolumeUp, FaVolumeMute, FaMusic, FaDrum } from 'react-icons/fa';
import posed from 'react-pose';
import './SoundSettings.css';
        
const SoundSettingsWrap = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 200 }
  },
  visible: {
    opacity: 1,
    transition: { duration: 200 }
  }
});

class SoundSettings extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showFacts: props.showFacts,
      animation: "hidden",
      dropdownOpen: false
    };
  }

  componentDidMount() {
    setTimeout( () => this.setState({ animation: "visible" }), 200 );
  }

  toggleMuteAll() {
    var newState = !(this.props.muteSFX && this.props.muteMusic)
    this.props.onSave({ 
      muteMusic: newState, 
      muteSFX: newState
    });
  }

  toggleSFX() {
    console.log("toggleSFX");
    this.props.onSave({muteSFX: !this.props.muteSFX});
  }

  toggleMusic() {
    console.log("toggleMusic");
    this.props.onSave({muteMusic: !this.props.muteMusic});
  }

  toggleDropDown() {
    console.log("toggleDropDown");
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
      return <SoundSettingsWrap pose={this.state.animation}>
      <div className="soundSettingsPane">
          <ButtonGroup size="lg btn-group-vertical">
            <Button className="d-none d-lg-inline" id="btn-mute-all" onClick={ () => this.toggleMuteAll() } color={ this.props.muteMusic && this.props.muteSFX ? "dark" : "light"}>
            { this.props.muteMusic && this.props.muteSFX ? <FaVolumeMute/> : <FaVolumeUp/> }
            </Button>
            <UncontrolledTooltip placement="bottom" target="btn-mute-all">
            { this.props.muteMusic && this.props.muteSFX ? "UnMute" : "Mute" } All Sounds
            </UncontrolledTooltip>
            <Button id="btn-mute-music" onClick={this.toggleMusic.bind(this)} color={ this.props.muteMusic ? "dark" : "light"} >
             <FaMusic />
            </Button>
            <UncontrolledTooltip placement="bottom" target="btn-mute-music">
            { !this.props.muteMusic ? "Mute" : "UnMute" } Music
            </UncontrolledTooltip>
            <Button id="btn-mute-sfx" onClick={this.toggleSFX.bind(this)} color={ this.props.muteSFX ? "dark" : "light" }>
             <FaDrum/>
            </Button>
            <UncontrolledTooltip placement="bottom" target="btn-mute-sfx">
            { !this.props.muteSFX ? "Mute" : "UnMute" } Sound Effects
            </UncontrolledTooltip>
          </ButtonGroup>
        </div>
      </SoundSettingsWrap>;
  }
}

export default SoundSettings;
