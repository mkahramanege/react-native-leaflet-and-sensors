import React from 'react';
import { View } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';


//Accelerometer
export default class Screen extends React.Component {

    componentWillMount() {
        //Sensör için değişiklik algılama süresi ms cinsinden belirledik.
        setUpdateIntervalForType(SensorTypes.accelerometer, 400);

        this.subscription = accelerometer
            .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
            .subcscribe(
                speed => console.log(`Hızınız: ${speed}`),
                error => {
                    console.log('Veriler alınamadı');
                    console.log(error);
                }
            );
    }

    render() {
        return (<View style={{ flex: 1 }} />);
    }
}
