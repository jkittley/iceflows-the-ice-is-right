
import React from 'react';
import { Button } from 'reactstrap';
import posed from 'react-pose';
import MusicPlayer from './MusicPlayer';
import "./GameOver.css";

const GameOverWrapper = posed.div({
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
  }
});

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: "hidden"
    };
  }

  componentDidMount () {
    setTimeout(() => this.setState({ animation: "in" }), 500);
  }

  render() {
    var audioFile = require('../res/sounds/gameover-good.wav');
    if (this.props.score <= 0) audioFile = require('../res/sounds/gameover-bad.wav');
    return <GameOverWrapper className="game-over" pose={this.state.animation}>
      <div className="game-over-inner">
        <h1>Game Over</h1>
        <h2>You scored { this.props.score } points</h2>
        <div>
          <Button color="warning" size="lg" onClick={ () => this.props.playAgain() }>Play Again?</Button>{' '}
        </div>
      </div>
      <MusicPlayer url={audioFile} muted={this.props.settings.muteSFX } autoPlay />
    </GameOverWrapper>;
  }
}

export default GameOver;
