import React from 'react';
import posed from 'react-pose';
import "./ScoreCard.css";
import ScorePopup from './ScorePopup';

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
    this.setState({ scorePopup: "in", scoreType: "win" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1000);
    setTimeout( () => this.setState({ scorePopup: "hidden" }), 2000);
  }

  pointLost() {
    this.setState({ scorePopup: "in", scoreType: "loose" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1000);
    setTimeout( () => this.setState({ scorePopup: "hidden" }), 2000);
  }

  itsADraw() {
    console.log("Its a draw");
    this.setState({ scorePopup: "in", scoreType: "draw" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1000);
    setTimeout( () => this.setState({ scorePopup: "hidden" }), 2000);
  }

  render() {
    return <div className="score-card bg-black">
     <ScoreNumberWrap pose={this.state.animation}>
     <h1>SCORE: { this.props.score }</h1>
     </ScoreNumberWrap>
     <ScorePopup mode={this.state.scorePopup} scoreType={this.state.scoreType} />
    </div>;
  }
}

export default ScoreCard;