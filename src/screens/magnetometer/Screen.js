import React from 'react';
import { View } from 'react-native';
import { magnetometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';


//Accelerometer
export default class Screen extends React.Component {

    state = {
        x: 0,
        y: 0,
        timestamp: null,
        started: false
    }

    componentWillMount(){

        console.log('magnetometer');

        //Sensör için değişiklik algılama süresi ms cinsinden belirledik.
        setUpdateIntervalForType(SensorTypes.magnetometer, 400);

        this.subscription = magnetometer.subscribe((data) => {
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
