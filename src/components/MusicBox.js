
import React from 'react';
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import posed from 'react-pose';
import './MusicBox.css';
        
const MusicBoxWrap = posed.div({
  hidden: {
    x: 1000,
    opacity: 0,
    transition: { duration: 200 }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 200 }
  }
});

class MusicBox extends React.Component {
  
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
    this.setState({ animation: "visible" });
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
    this.props.onSave({muteSFX: !this.state.muteSFX});
  }

  toggleMusic() {
    console.log("toggleMusic");
    this.props.onSave({muteMusic: !this.state.muteMusic});
  }

  toggleDropDown() {
    console.log("toggleDropDown");
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
      return <MusicBoxWrap pose={this.state.animation}>
      <div className="musicBoxPane">
          <ButtonGroup>
            <Button size="lg" color="light" onClick={ () => this.toggleMuteAll() }>
            { this.props.muteMusic && this.props.muteSFX ? <FaVolumeMute/> : <FaVolumeUp/> }
            </Button>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown.bind(this)}>
              <DropdownToggle caret color="light" >
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.toggleSFX.bind(this)}>{ !this.props.muteSFX ? "Mute" : "Turn On" } Sound Effects</DropdownItem>
                <DropdownItem onClick={this.toggleMusic.bind(this)}>{ !this.props.muteMusic ? "Mute" : "Turn On" } Music</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
        </div>
      </MusicBoxWrap>;
  }
}

export default MusicBox;
