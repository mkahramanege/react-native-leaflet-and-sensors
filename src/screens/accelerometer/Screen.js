import React from 'react';
import { View } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';


//Accelerometer
export default class Screen extends React.Component {

    componentWillMount() {
        //Sensör için değişiklik algılama süresi ms cinsinden belirledik.
        setUpdateIntervalForType(SensorTypes.accelerometer, 400);

        this.subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
            console.log({ x, y, z, timestamp })
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (<View style={{ flex: 1 }} />);
    }
}
