import { ADD_ZONE, SET_MAPS_READY } from "../actionTypes";

const initialState = {
  layers: {
    "icedepth":  { id: "icedepth", title: "Ice Thickness",  image: require('../../res/maps/layer_icedepth.jpg') },
    "bedelev" :  { id: "bedelev",  title: "Bed Elevation",  image: require('../../res/maps/layer_bedelevation.jpg') },
    "icespeed" : { id: "icespeed", title: "Ice Flow Speed", image: require('../../res/maps/layer_iceflowspeed.jpg') },
  },
  layerOrder: ["icespeed", "icedepth", "bedelev"],
  defaultLayer: "icespeed",
  zones: {},
  ready: false
};

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_ZONE: {
      return {
        ...state,
        zones: {
          ...state.zones,
          ...action.payload
        }
      };
    }

    case SET_MAPS_READY: {
      return {
        ...state,
        ready: action.payload
      };
    }
    

    default:
      return state;
  }
}
