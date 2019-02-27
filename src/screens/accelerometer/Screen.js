import React from 'react';
import { View } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';


//Accelerometer
export default class Screen extends React.Component {

    state = {
        x: 0,
        y: 0,
        timestamp: null,
        started: false
    }

    componentWillMount() {
        //Sensör için değişiklik algılama süresi ms cinsinden belirledik.
        setUpdateIntervalForType(SensorTypes.accelerometer, 400);

        this.subscription = accelerometer.subscribe((data) => {
                console.log(data);
            }
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (<View style={{ flex: 1 }} />);
    }
}
