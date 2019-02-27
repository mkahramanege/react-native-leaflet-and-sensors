import React from 'react';
import { AppRegistry } from 'react-native';

//Redux
import { Provider } from 'react-redux';
import configureStore from './src/redux/store/store';

//App
import App from './App';
import { name as appName } from './app.json';

const store = configureStore();

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
