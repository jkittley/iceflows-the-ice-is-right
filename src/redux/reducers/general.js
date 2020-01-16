import { SET_PAGE, SET_SOUNDS_READY, SET_SFX, SET_MUSIC, ADD_ERROR, SET_SOUNDS_LOADED } from "../actionTypes";

const initialState = {
  page: "home",
  errors: [],
  soundManagerReady: false,
  soundsLoaded: false,
  selectedMusic: "menu",
  selectedSFX: null,
  optionsMusic: [
    { ref: "game", url: require("../../res/sounds/menumusic.wav") },
    { ref: "menu", url: require("../../res/sounds/gamemusic.wav") },
  ],
  optionsSFX: [
    { ref: "ping", url: require("../../res/sounds/ping.wav") },
    { ref: "click", url: require("../../res/sounds/click.wav") },
    { ref: "deal", url: require("../../res/sounds/deal.wav") },
    { ref: "win", url: require("../../res/sounds/win.wav") },
    { ref: "loose", url: require("../../res/sounds/loose.wav") },
    { ref: "draw", url: require("../../res/sounds/draw.wav") },
    { ref: "gameover-good", url: require("../../res/sounds/gameover-good.wav") },
    { ref: "gameover-bad", url: require("../../res/sounds/gameover-bad.wav") },
  ],
};

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_PAGE: {
      return {
        ...state,
        page: action.payload
      };
    }

    case ADD_ERROR: {
      return {
        ...state,
        selectedMusic: action.payload
      };
    }

    case SET_SOUNDS_READY: {
      return {
        ...state,
        soundManagerReady: action.payload
      };
    }

    case SET_SOUNDS_LOADED: {
      return {
        ...state,
        soundsLoaded: action.payload
      };
    }

    case SET_SFX: {
      return {
        ...state,
        selectedSFX: action.payload
      };
    }

    case SET_MUSIC: {
      return {
        ...state,
        selectedMusic: action.payload
      };
    }
    
    
    default:
      return state;
  }
}
