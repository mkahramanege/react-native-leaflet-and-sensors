import React from 'react';
import { View } from 'react-native';
import { barometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';


//Accelerometer
export default class Screen extends React.Component {

    state = {}

    componentWillMount() {
        console.log('Barometer');

        //Sensör için değişiklik algılama süresi ms cinsinden belirledik.
        setUpdateIntervalForType(SensorTypes.barometer, 400);

        this.subscription = barometer.subscribe(({ pressure }) => {
                console.log(`Basınç: ${pressure}`);
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (<View style={{ flex: 1 }} />);
    }
}
