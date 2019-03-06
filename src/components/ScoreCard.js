import React from 'react';
import "./ScoreCard.css";
import ScorePopup from './ScorePopup';

class ScoreCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scorePopup: "hidden",
      scoreMessage: "Yay!",
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.score > this.props.score) {
      this.pointLost();
    } else if (prevProps.score < this.props.score) {
      this.pointGained();
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

  render() {
    return <div className="score-card w-100 bg-black">
     <h1>SCORE: { this.props.score }</h1>
     <ScorePopup mode={this.state.scorePopup} scoreType={this.state.scoreType} />
    </div>;
  }
}

export default ScoreCard;