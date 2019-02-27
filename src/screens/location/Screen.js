
import React from 'react';
import {View, Text,  StyleSheet, Image ,PermissionsAndroid,Platform} from 'react-native';

export default class Screen extends React.Component {

  state = {
    currentLongitude: 'unknown',
    currentLatitude: 'unknown',
 }

 componentDidMount = () => {

  var that =this;
  
  if(Platform.OS === 'ios'){
    //Direkt Lokasyon Çağrılıyor
    this.callLocation(that);
  } else {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Konum Bilgisi Yetkisi',
            'message': 'Konum bilgilerinizi paylaşır mısınız ?'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Yetki verildi konum bilgisini al
          that.callLocation(that);
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        alert("err",err);
        console.warn(err)
      }
    }

    requestLocationPermission();
  }    
 }

 callLocation(that){

    //Bir kereye mahsus konum alıyor
    navigator.geolocation.getCurrentPosition(
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          that.setState({ currentLongitude:currentLongitude });
          that.setState({ currentLatitude:currentLatitude });
       },
       (error) => alert(error.message),
       { 
           enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
        }
    );

    //Sürekli izleme uygulama açıkken
    that.watchID = navigator.geolocation.watchPosition((position) => {
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
       that.setState({ currentLongitude:currentLongitude });
       that.setState({ currentLatitude:currentLatitude });
    });
 }

 componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
 }

 render() {
    return (
       <View style = {styles.container}>
          <Text style = {styles.boldText}>
             Konumunuz
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
            Longitude: {this.state.currentLongitude}
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
            Latitude: {this.state.currentLatitude}
          </Text>
       </View>
    )
 }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 50,
        padding:16,
        backgroundColor:'white'
    },
    boldText: {
        fontSize: 30,
        color: 'red',
    }
})