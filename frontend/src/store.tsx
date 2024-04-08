import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
// import {configureStore, combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "@redux-devtools/extension"

const reducer = combineReducers({

});


let initialState = {
    
};

const middleware = [thunk];

export const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
