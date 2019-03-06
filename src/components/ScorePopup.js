import React from 'react';
import posed from 'react-pose';

const ScoreWrapper = posed.div({
  hidden: {
    y: -500,
    opacity: 0,
    transition: { duration: 150 }
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
    y: -500,
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
    return <ScoreWrapper className="playing-card" pose={ this.props.mode }>
    <div className="w-100 bg-black">
     <h1>SCORE</h1>
    </div></ScoreWrapper>;
  }
}

export default ScorePopup;