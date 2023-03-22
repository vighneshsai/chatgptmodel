import { combineReducers } from "redux";

import { chatReducer ,chatInitialState } from "./chat";
import { TextInitialState, textReducer } from "./text";


export const InitalState = {
    chat: chatInitialState,
    texted:TextInitialState
    
}

export const rootReducer = combineReducers({
    chat: chatReducer,
    texted:textReducer
   
})