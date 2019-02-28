import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import WebViewLeaflet from '../../components/leaflet/WebViewLeaflet';

//Fingerprint
export default class Screen extends React.Component {

  
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: null,
      markers: [],
      currentLocation: undefined,
      mapCenterPosition: undefined,
      showEmojiSelectorModal: false,
      mapState: {
        showAttributionControl: false,
        showZoomControls: false,
        panToLocation: false,
        zoom: 10
      }
    };

    this.mapLayers = [
      {
       name: 'OpenStreetMap',
       checked: 'true',
       type: 'TileLayer',
       baseLayer: true,
       url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     },
      {
       name: 'streets',
       type: 'TileLayer',
       baseLayer: true,
       url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWNkdW5kYXIiLCJhIjoiY2pzbTd3ZTNmMW81MjQ5b2xlOWk2anZnMSJ9.OKOnO6b7mG1-LSVEtzMxFQ',
       attribution:
         '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     },
     {
       name: 'light',
       type: 'TileLayer',
       baseLayer: true,
       url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWNkdW5kYXIiLCJhIjoiY2pzbTd3ZTNmMW81MjQ5b2xlOWk2anZnMSJ9.OKOnO6b7mG1-LSVEtzMxFQ',
       attribution:
         '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     }, 
     {
       name: 'dark',
       type: 'TileLayer',
       baseLayer: true,
       url: 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWNkdW5kYXIiLCJhIjoiY2pzbTd3ZTNmMW81MjQ5b2xlOWk2anZnMSJ9.OKOnO6b7mG1-LSVEtzMxFQ',
       attribution:
         '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
     },
     {
       name: 'WMS Tile Layer',
        type: 'WMSTileLayer',
        url: 'https://demo.boundlessgeo.com/geoserver/ows',
        layers: 'nasa:bluemarble'
      }
   ];
  }
  
    componentWillMount() {      
    }

    componentWillUnmount() {
    }

    onLoad = (event) => {
      console.log('onLoad received ');
      console.log(event);
      this.setState({
        ...this.state,
        mapState: { ...this.state.mapState, mapLoaded: true }
      });
      setTimeout(() => {
        this.setState({
          bounds: [
            [56.8859948, -76.91253011988012],
            [50.07467659353497, -76.4096857]
          ],
          boundsOptions: { padding: [50, 50] }
        });
      }, 5000);
    };

    render() {
        return (<View style={styles.container}>
          <View style={styles.statusBar} />
          <Text
            style={{
              margin: 10,
              fontSize: 18,
              color: 'black'
            }}
          >
            react-native-webview-leaflet Demo
          </Text>
          <WebViewLeaflet
            ref={(component) => (this.webViewLeaflet = component)}
            onLoad={this.onLoad}
            eventReceiver={this} // the component that will receive map events
            centerPosition={this.state.mapCenterPosition}
            markers={this.state.markers}
            mapLayers={this.mapLayers}
            ownPositionMarker={{
              coords: this.state.currentLocation,
              icon: '❤️',
              size: [24, 24],
              animation: {
                name: 'pulse',
                duration: '.5',
                delay: 0,
                interationCount: 'infinite'
              }
            }}
            centerButton
            useMarkerClustering
            bounds={this.state.bounds}
            boundsOptions={{ padding: [100, 100] }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 8,
              backgroundColor: 'rgba(255,255,255,.50)'
            }}
          >
            <Button
              onPress={() => this.centerMap('dw')}
              borderWidth={0}
              fontSize={30}
              title={'🏰'}
            />
            <Button
              onPress={() => this.centerMap('bg')}
              borderWidth={0}
              fontSize={30}
              title={'🍺'}
            />
            <Button
              onPress={() => this.centerMap('kd')}
              borderWidth={0}
              fontSize={30}
              title={'👑'}
            />
          </View>
        </View>);
    }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00ffff',

    display: 'flex'
  },
  statusBar: {
    height: 40
  },
  controlButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'dodgerblue'
  }
});
