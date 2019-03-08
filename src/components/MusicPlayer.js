import React from 'react';
import Sound from 'react-sound';
import {Button} from 'reactstrap';
import { FaPlay, FaStop} from 'react-icons/fa';


class MusicPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      playStatus: Sound.status.STOPPED
    };
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.isPlaying = this.isPlaying.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // If the updated state says muted
    if (this.props.muted && this.isPlaying()) this.stopSound();
    // If the updated state is
    if (prevProps.muted && !this.props.muted && this.props.autoResume) this.playSound();
  }

  isPlaying() {
    return this.state.playStatus === Sound.status.PLAYING;
  }

  togglePlaySound() {
    if (this.state.isLoaded === false) return;
    if (this.state.playStatus === Sound.status.PLAYING) {
      this.stopSound();
    } else if (!this.props.muted) {
      this.playSound();
    }
  }

  playSound() {
    this.setState({ playStatus: Sound.status.PLAYING });
  }

  stopSound() {
    this.setState({ playStatus: Sound.status.STOPPED });
  }

  onFinishLoad() {
    this.setState({ isLoaded: true });
    if (this.props.autoPlay && !this.props.muted) this.playSound();
  }

  onFinishPlay() {
    if (this.props.callbackFinish) this.props.callbackFinish();
  }

  render () {

    var controls = null;
    if (this.props.showControls && this.state.isLoaded) {
      controls = <Button className="ml-4" color="danger" onClick={ this.togglePlaySound.bind(this) }>
               { !this.isPlaying() ? <FaPlay/> : <FaStop/> }
      </Button>
    } else if (this.props.showControls) {
      controls = <Button>Loading...</Button>
    }
    return <div>
      {controls}
      { this.props.url && <Sound
          url={this.props.url}
          playFromPosition={20}
          autoLoad={this.props.autoLoad}
          playStatus={this.state.playStatus}
          loop={this.props.loop}
          onLoad={this.onFinishLoad.bind(this)}
          onFinishedPlaying={this.onFinishPlay.bind(this)}
      /> }
    </div>
  }
}

MusicPlayer.defaultProps = {
  loop: false,
  callbackFinish: false,
  autoLoad: true,
};
         
export default MusicPlayer;