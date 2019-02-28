import React from 'react';
import { View } from 'react-native';
//import FingerprintScanner from 'react-native-fingerprint-scanner';

//Fingerprint
export default class Screen extends React.Component {

    state = {}

    componentWillMount() {      
        /*FingerprintScanner
        .authenticate({ onAttempt: this.handleAuthenticationAttempted })
        .then(() => {
            this.props.handlePopupDismissed();
            Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        })
        .catch((error) => {
            console.log('Hata 1');
            console.log(error);
        });*/  
    }

    componentWillUnmount() {
        /*FingerprintScanner.release();*/
    }

    handleAuthenticationAttempted = () => {
        /*console.log('Hata 2');
        console.log(error);*/
      };

    render() {
        return (<View style={{ flex: 1 }} />);
    }
}
