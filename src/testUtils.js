import { createStore, applyMiddleware } from 'redux';
import { reducers } from './redux/store';
import thunk from 'redux-thunk';

// Returns a Store with provided Input State
export const storeFactory = (initialState) => {
    return createStore(reducers, initialState, applyMiddleware(thunk));
}

// Finds element in ShallowWrapper by test-id
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}