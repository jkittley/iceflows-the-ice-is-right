import React from 'react';
import posed from 'react-pose';
import MusicPlayer from './MusicPlayer';
import ScorePopup from './ScorePopup';
import { Progress } from 'reactstrap';
import "./ScoreCard.css";

const ScoreNumberWrap = posed.div({
  hidden: {
    x: -300,
    opacity: 0,
    transition: { duration: 200 }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 200 }
  }
});

class ScoreCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scorePopup: "hidden",
      scoreMessage: "Yay!",
      animation: "hidden",
      bonusAnimation: "hidden",
      audioFile: null,
    }
  }

  componentDidMount() {
    this.setState({ animation: "visible" });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.score !== this.props.score) {
      this.setState({ bonusAnimation: "visible" });
      setTimeout( () => this.setState({ bonusAnimation: "hidden" }), 200);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.score > this.props.score) {
      this.pointLost();
    } else if (prevProps.score < this.props.score) {
      this.pointGained();
    }
    if (prevProps.numDraws !== this.props.numDraws) {
      this.itsADraw();
    }
  }

  pointGained() {
    this.setState({ scorePopup: "in", scoreType: "win", audioFile: require('../res/sounds/win.wav') });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1500);
    setTimeout( () => this.setState({ scorePopup: "hidden", audioFile: null }), 3000);
  }

  pointLost() {
    this.setState({ scorePopup: "in", scoreType: "loose", audioFile: require('../res/sounds/loose.wav') });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1500);
    setTimeout( () => this.setState({ scorePopup: "hidden", audioFile: null }), 3000);
  }

  itsADraw() {
    console.log("Its a draw");
    this.setState({ scorePopup: "in", scoreType: "draw", audioFile: require('../res/sounds/draw.wav') });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1500);
    setTimeout( () => this.setState({ scorePopup: "hidden", audioFile: null }), 3000);
  }

  resetAudio() {
    console.log('Callback');
    this.setState({ audioFile: null });
  }

  render() {
    return <div className="score-card bg-black">
     { this.state.audioFile && <MusicPlayer url={this.state.audioFile} muted={this.props.settings.muteSFX } autoPlay callbackFinish={this.resetAudio.bind(this)} /> }
     <ScoreNumberWrap pose={this.state.animation}>
     <h1>SCORE:<span width="200">{ this.props.score }</span></h1>
     </ScoreNumberWrap>
     <div className="stats text-center text-white mt-2">
        <Progress value={ this.props.cardsPlayed } max={this.props.numCards}/>
        <h6 className="mt-2">Cards remaining: { this.props.cardsPlayed }</h6>
      </div>

     <ScorePopup mode={this.state.scorePopup} scoreType={this.state.scoreType} />
    </div>;
  }
}

export default ScoreCard;