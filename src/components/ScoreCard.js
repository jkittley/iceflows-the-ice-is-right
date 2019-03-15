import React from 'react';
import { connect } from 'react-redux';
import { sfx } from '../redux/actions';
import posed from 'react-pose';
import ScorePopup from './ScorePopup';
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
      showBonusAnimation: "hidden",
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
    this.props.sfx("win");
    this.setState({ showBonusAnimation: true, scorePopup: "in", scoreType: "win" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1000);
    setTimeout( () => this.setState({ showBonusAnimation: false, scorePopup: "hidden" }), 1500);
  }

  pointLost() {
    this.props.sfx("loose");
    this.setState({ showBonusAnimation: true, scorePopup: "in", scoreType: "loose" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1000);
    setTimeout( () => this.setState({ showBonusAnimation: false, scorePopup: "hidden" }), 1500);
  }

  itsADraw() {
    this.props.sfx("draw");
    this.setState({ showBonusAnimation: true, scorePopup: "in", scoreType: "draw" });
    setTimeout( () => this.setState({ scorePopup: "out" }), 1000);
    setTimeout( () => this.setState({ showBonusAnimation: false, scorePopup: "hidden" }), 1500);
  }

  render() {
    return <div className="score-card bg-black">
     <ScoreNumberWrap pose={this.state.animation}>
     <h1>SCORE:<span width="200">{ this.props.score }</span></h1> 
     <div className="stats text-left text-white mt-2">
        <h6 className="mt-2">Cards remaining: { Math.max(0, this.props.numCards - this.props.cardsPlayed) }</h6>
     </div>
     </ScoreNumberWrap>

      { this.state.showBonusAnimation && <ScorePopup mode={this.state.scorePopup} scoreType={this.state.scoreType} /> }
    </div>;
  }
}

const mapStateToProps = state => { return { }};
const mapDispatchToProps = { sfx }
export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard);