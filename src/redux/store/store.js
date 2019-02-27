import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({});

const configureStore = () => createStore(rootReducer);

export default configureStore;
