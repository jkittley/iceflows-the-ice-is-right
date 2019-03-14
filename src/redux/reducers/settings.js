import { UPD_SETTINGS, TOGGLE_MUTE_FX, TOGGLE_MUTE_MUSIC } from "../actionTypes";

const initialState = {
  muteSFX: false,
  muteMusic: false,
};

export default function(state = initialState, action) {
  switch (action.type) {

    case UPD_SETTINGS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case TOGGLE_MUTE_FX: {
      return {
        ...state,
        muteSFX: !state.muteSFX
      };
    }

    case TOGGLE_MUTE_MUSIC: {
      return {
        ...state,
        muteMusic: !state.muteMusic
      };
    }

    default:
      return state;
  }
}
