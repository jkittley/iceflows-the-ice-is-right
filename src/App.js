import React from 'react';
import Game from './Game';
import ScreenTooSmall from './components/ScreenTooSmall';
import Welcome from './components/Welcome';
import './App.css';
import {Helmet} from "react-helmet";
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

  getMain() {
    if (this.state.width < 800 || this.state.height < 600) return <ScreenTooSmall />;
    if (this.state.gameOn) return <Game/>;
    return <Welcome onClick={ this.startGame.bind(this) }/>
  }

  render() {
    var twitterCard = require("./res/twitter-card.png");
    var openCard = require("./res/opengraph-card.png");

    return <div class="app">
    <Helmet>
      <meta charSet="utf-8" />
      <title>The Ice Is Right - An Ice Flows Game</title>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content="@iceflowsgame"/>
      <meta name="twitter:title" content="The Ice Is Right - An Ice Flows Game"/>
      <meta name="twitter:description" content="A game about ice flow in the Antarctic" />
      <meta name="twitter:creator" content="@iceflowsgame"/>
      <meta name="twitter:image" content={"http://www.iceflowsgame.com"+twitterCard} />
      <meta property="og:title" content="Ice Flows" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="http://www.iceflowsgame.com/theiceisright/" />
      <meta property="og:image" content={"http://www.iceflowsgame.com"+openCard} />
      <meta property="og:description" content="A game about ice flow in the Antarctic" />
      <meta property="og:site_name" content="The Ice Is Right - An Ice Flows Game" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />
    </Helmet>
    { this.getMain() }
    </div>;    
  }
}

export default App;