import { createStore, combineReducers } from 'redux';
import mainReducer from '../reducers/mainreducer';

const rootReducer = combineReducers({
    main: mainReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
