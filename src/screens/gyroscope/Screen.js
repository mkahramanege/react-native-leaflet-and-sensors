import React from 'react';
import { View, Alert } from 'react-native';
import { gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';


//Accelerometer
export default class Screen extends React.Component {

    state = {
        x: 0,
        y: 0,
        timestamp: null,
        started: false
    }

    componentWillMount() {
        console.log('gyroscope');

        try {
           //Sensör için değişiklik algılama süresi ms cinsinden belirledik.
            setUpdateIntervalForType(SensorTypes.gyroscope, 400);

            
            this.subscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
                    this.setState({
                    x,
                    y,
                    z,
                    timestamp,
                    started: true 
                    });
                }
            ); 
        } catch (error) {
            Alert.alert('React Native', 'Sensör bulunamadı !');
        }
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (<View style={{ flex: 1 }} />);
    }
}
