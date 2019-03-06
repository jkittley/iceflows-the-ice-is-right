import React from 'react';
import Sound from 'react-sound';
import {Button} from 'reactstrap';
import { FaPlay, FaStop} from 'react-icons/fa';

class MusicPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      isPlaying: false,
      playStatus: Sound.status.STOPPED
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.muted && this.state.isPlaying) this.togglePlaySound();
  }

  togglePlaySound() {
    if (this.state.isLoaded === false) return;
    if (this.state.playStatus === Sound.status.PLAYING) {
      this.setState({ isPlaying: false, playStatus: Sound.status.STOPPED });
    } else if (!this.props.muted) {
      this.setState({ isPlaying: true, playStatus: Sound.status.PLAYING });
    }
  }

  onFinishLoad() {
    this.setState({ isLoaded: true });
  }

  onFinishPlay() {
    this.setState({ isPlaying: false });
  }

  render () {
    if (this.props.showControls && this.state.isLoaded) {
      var controls = <Button className="ml-4" color="danger" onClick={ this.togglePlaySound.bind(this) }>
               { this.state.isPlaying ? <FaPlay/> : <FaStop/> }
      </Button>
    } else if (this.props.showControls) {
      var controls = <Button>Loading...</Button>
    }
    return <div>
      {controls}
      { this.props.url && <Sound
          url={this.props.url}
          autoLoad={true}
          playStatus={this.state.playStatus}
          playFromPosition={0}
          onLoad={this.onFinishLoad.bind(this)}
          onFinishedPlaying={this.onFinishPlay.bind(this)}
      /> }
    </div>
  }
}
         
export default MusicPlayer;