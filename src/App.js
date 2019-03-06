import React from 'react';
import Game from './Game';
import ScreenTooSmall from './components/ScreenTooSmall';
import Welcome from './components/Welcome';
import './App.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-79207363-1');

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      gameOn: false,    
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  startGame() {
    this.setState({ gameOn: true });
  }

  render() {
    if (this.state.width < 800 || this.state.height < 600) return <ScreenTooSmall />;
    if (this.state.gameOn) return <Game/>;
    return <Welcome onClick={ this.startGame.bind(this) }/>
  }
}

export default App;