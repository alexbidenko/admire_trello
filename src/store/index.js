import {combineReducers, createStore} from "redux";

import board from './board';

const store = combineReducers({
    board,
});

export default createStore(store);
