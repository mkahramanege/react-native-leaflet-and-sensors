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

        this.subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
                if (this.state.started) {
                    const xfark = x - this.state.x;
                    const yfark = y - this.state.y;

                    const zfark = Math.sqrt((xfark * xfark) + (yfark * yfark));

                    console.log(zfark);
                }

                this.setState({
                   x,
                   y,
                   z,
                   timestamp,
                   started: true 
                });
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
