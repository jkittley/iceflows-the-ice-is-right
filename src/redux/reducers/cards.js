import { ADD_CARD, SET_CARDS_READY, SET_FACT_META, UPD_FACT_META } from "../actionTypes";

const initialState = {
  all: [],
  factsMeta: [],
  ready: false
};

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_CARD: {
      return {
        ...state,
        all: [
          ...state.all,
          action.payload
        ].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      };
    }

    case SET_CARDS_READY: {
      return {
        ...state,
        ready: action.payload
      };
    }

    case SET_FACT_META: {
      return {
        ...state,
        factsMeta: Object.values(action.payload).sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      };
    }

    case UPD_FACT_META: {
      return {
        ...state,
        factsMeta: [
          ...state.factsMeta.filter( x => x.id !== action.id),
          {
            ...state.factsMeta.filter( x => x.id === action.id)[0],
            ...action.payload
          }
        ].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      };
    }

    default:
      return state;
  }
}
