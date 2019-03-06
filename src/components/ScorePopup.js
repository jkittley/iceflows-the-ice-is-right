import React from 'react';
import posed from 'react-pose';
import "./ScorePopup.css";

const ScoreWrapper = posed.div({
  hidden: {
    y: -1000,
    opacity: 0,
    transition: { duration: 1 }
  },
  in: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 100, damping: 15 },
      default: { duration: 300 }
    }
  },
  out: {
    y: 2000,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 100, damping: 15 },
      default: { duration: 300 }
    }
  },
});;

class ScorePopup extends React.Component {
  render() {
    if (this.props.scoreType === "win") {
      return <ScoreWrapper className="score-popup win" pose={ this.props.mode }>
      <div className="score-popup-inner">
      <h1>Score!!!</h1>
      </div></ScoreWrapper>;
    } else {
      return <ScoreWrapper className="score-popup loose" pose={ this.props.mode }>
      <div className="score-popup-inner">
      <h1>You Loose!!!</h1>
      </div></ScoreWrapper>;
    }
  }
}

export default ScorePopup;