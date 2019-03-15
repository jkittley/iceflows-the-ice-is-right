import { SET_PAGE, UPD_SETTINGS, ADD_CARD, SET_CARDS_READY, 
  ADD_ZONE, SET_MAPS_READY, SET_FACT_META, UPD_FACT_META,
  TOGGLE_MUTE_FX, TOGGLE_MUTE_MUSIC, SET_SOUNDS_READY, SET_SFX, SET_MUSIC, ADD_ERROR, SET_MAPS_DEFAULT_LAYER
} from "./actionTypes";


// Pages

export const goHome = () => ({
  type: SET_PAGE,
  payload: "home"
});

export const gotoPage = pageName => ({
  type: SET_PAGE,
  payload: pageName
});

export const addError = errorData => ({
  type: ADD_ERROR,
  payload: errorData
});


// Settings

export const updSettings = changes => ({
  type: UPD_SETTINGS,
  payload: changes
});

export const updFactMeta = (id, changes) => ({
  type: UPD_FACT_META,
  id: id,
  payload: changes
});

export const toggleMuteSFX = () => ({
  type: TOGGLE_MUTE_FX
});

export const toggleMuteMusic = () => ({
  type: TOGGLE_MUTE_MUSIC
});

// Cards

export const addCard = card => ({
  type: ADD_CARD,
  payload: card
});

export const setCardsReady = value => ({
  type: SET_CARDS_READY,
  payload: value
});

export const setFactsMeta = metaData => ({
  type: SET_FACT_META,
  payload: metaData
});

// Maps

export const addZone = card => ({
  type: ADD_ZONE,
  payload: card
});

export const setMapsReady = value => ({
  type: SET_MAPS_READY,
  payload: value
});

export const setDefaultLayer = value => ({
  type: SET_MAPS_DEFAULT_LAYER,
  payload: value
});



// Sounds

export const setSoundsReady = value => ({
  type: SET_SOUNDS_READY,
  payload: value
});

export const sfx = ref => ({
  type: SET_SFX,
  payload: ref
})

export const setMusic = ref => ({
  type: SET_MUSIC,
  payload: ref
})