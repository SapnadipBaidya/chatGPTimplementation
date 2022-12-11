
import chatBotReducer from "./chatBotReducer";

import { combineReducers } from "redux";


const reducers = combineReducers({
  chatBotReducer:chatBotReducer,

});

export default reducers;
