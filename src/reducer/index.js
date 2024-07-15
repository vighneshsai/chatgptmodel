import { combineReducers } from "redux";

import { chatReducer ,chatInitialState } from "./chat";
import { TextInitialState, textReducer } from "./text";
import { employeeInitialState, employeeReducer } from "./employee";


export const InitalState = {
    chat: chatInitialState,
    texted:TextInitialState,
    employee: employeeInitialState
    
}

export const rootReducer = combineReducers({
    chat: chatReducer,
    texted:textReducer,
    employee: employeeReducer
   
})