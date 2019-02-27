import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import * as AScreen from './src/screens/accelerometer/Screen';
import * as BScreen from './src/screens/barometer/Screen';
import * as GScreen from './src/screens/gyroscope/Screen';
import * as MScreen from './src/screens/magnetometer/Screen';
import * as LScreen from './src/screens/location/Screen';
import * as FScreen from './src/screens/fingerprint/Screen';

const Drawer = createDrawerNavigator({
    Fingerprint: {
      screen: FScreen.default
    },
    Location: {
      screen: LScreen.default
    },
    Accelerometer: {
      screen: AScreen.default
    },
    Barometer: {
      screen: BScreen.default
    },
    Gyroscope: {
      screen: GScreen.default
    },
    Magnetometer: {
      screen: MScreen.default
    }

});

const App = createAppContainer(Drawer);

export default App;
