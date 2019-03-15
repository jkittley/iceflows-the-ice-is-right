import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setSoundsReady, sfx } from './redux/actions';
import App from './App';

import { soundManager } from 'soundmanager2';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

var loadedSFX = null;
var loadedMusic = null;

function soundManagerStateChangeHandler() {
  var state = store.getState();

  // If the new state is muted and there is music playing stop
  if (state.settings.muteMusic && loadedMusic !== null) {
    stopMusic(loadedMusic); 
  } 
  // If not muted and there is a track to play then start the music
  if (!state.settings.muteMusic && state.general.selectedMusic !== null) {
    playMusic(state.general.selectedMusic);
  }
  // If the music file changes
  if (!state.settings.muteMusic && state.settings.selectedMusic !== loadedMusic) {
    playMusic(state.general.selectedMusic);
  }
  
  // If the new state is muted and there is an SFX loaded stop it
  if (state.settings.muteSFX && loadedSFX !== null) {
    stopSFX(loadedSFX);
  }
  // If SX is not muted and there is a SFX to play
  if (!state.settings.muteSFX && state.general.selectedSFX !== null) {
    playSFX(state.general.selectedSFX);
  }
  // If the system is muted then delete any sound effect created while muted
  if (state.settings.muteSFX && state.general.selectedSFX !== null) {
    stopSFX(state.general.selectedSFX);
  }

}

function playMusic(ref, repeat=false) {
  if (ref===undefined || ref===null) return;
  if (loadedMusic === ref && !repeat) return;
  if (loadedMusic !== null) stopMusic(loadedMusic);
  loadedMusic = ref;
  soundManager.getSoundById(ref).play({
    onfinish: () => playMusic(loadedMusic, true)
  });
}

function stopMusic(ref) {
  loadedMusic = null;
  if (ref===undefined || ref===null) return;
  soundManager.getSoundById(ref).stop();
}

function playSFX(ref) {
  if (ref===undefined || ref===null) return;
  // if (loadedSFX === ref) return; // If you uncomment this then only one occurrence of an FX at a time.
  loadedSFX = ref;
  store.dispatch(sfx(null));
  soundManager.getSoundById(ref).play({
    onfinish: () => { 
      loadedSFX = null; 
    }
  });
}

function stopSFX(ref) {
  loadedSFX = null;
  if (ref===undefined || ref===null) return;
  soundManager.getSoundById(ref).stop();
  store.dispatch(sfx(null));
}

function createSound(ref, url) {
  soundManager.createSound({
    id: ref,
    url: url,
    autoLoad: true,
    autoPlay: false,
    volume: 50
  });
}

soundManager.setup({
  onready: function() {
    store.subscribe(soundManagerStateChangeHandler);
    var state = store.getState();
    state.general.optionsMusic.forEach(sound => {
      createSound(sound.ref, sound.url);
    });
    state.general.optionsSFX.forEach(sound => {
      createSound(sound.ref, sound.url);
    });
    store.dispatch(setSoundsReady(true));
  }
});

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
