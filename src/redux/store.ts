import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import gamesReducer from "./reducers/gamesReducer";
import campaignsReducer from "./reducers/campaignsReducer";

export const reducers = combineReducers({
    games: gamesReducer,
    campaigns: campaignsReducer
});

const store = createStore(
    reducers, 
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;