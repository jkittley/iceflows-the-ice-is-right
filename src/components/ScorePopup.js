import React from 'react';
import posed from 'react-pose';
import { FaGrinWink, FaFrownOpen } from 'react-icons/fa';

import "./ScorePopup.css";

const ScoreWrapper = posed.div({
  hidden: {
    y: -4000,
    opacity: 0,
    transition: { duration: 1 }
  },
  in: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 100, damping: 15 },
      default: { duration: 500 }
    }
  },
  out: {
    y: 4000,
    opacity: 0,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 100, damping: 15 },
      default: { duration: 500 }
    }
  },
});

class ScorePopup extends React.Component {
  render() {
    if (this.props.scoreType === "win") {
      return <ScoreWrapper className="score-popup win" pose={ this.props.mode }>
      <div className="score-popup-inner">
      <h1>Correct!!! <FaGrinWink/></h1>
      </div></ScoreWrapper>;
    } else if (this.props.scoreType === "loose") {
      return <ScoreWrapper className="score-popup loose" pose={ this.props.mode }>
      <div className="score-popup-inner">
      <h1>Bad Luck <FaFrownOpen/></h1>
      </div></ScoreWrapper>;
    } else if (this.props.scoreType === "draw") {
      return <ScoreWrapper className="score-popup draw" pose={ this.props.mode }>
      <div className="score-popup-inner">
      <h1>- Draw -</h1>
      <h2>Try Again</h2>
      </div></ScoreWrapper>;
    }
    return null
  }
}

export default ScorePopup;