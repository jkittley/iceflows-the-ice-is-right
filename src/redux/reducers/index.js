import { combineReducers } from "redux";
import general from "./general";
import settings from "./settings";
import cards from "./cards";
import maps from "./maps";

export default combineReducers({ general, cards, maps, settings });
