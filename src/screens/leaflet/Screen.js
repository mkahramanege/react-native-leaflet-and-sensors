import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import WebViewLeaflet from '../../components/leaflet/WebViewLeaflet';
import Button from '../../components/leaflet/Button';
import mapLayers from './mockMapLayers';

const animations = ['bounce', 'fade', 'pulse', 'jump', 'waggle', 'spin'];

const interationCount = 'infinite';

const parkLocations = {
  dw: [28.417839, -81.563808],
  bg: [37.23416573, -76.63999744],
  kd: [37.837329984, -77.440331572]
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      errorMessage: null,

      //markers: testLocations,
      markers: [],
      currentLocation: undefined,
      mapCenterPosition: [40.203076, 29.060499],
      showEmojiSelectorModal: false,
      mapState: {
        showAttributionControl: false,
        showZoomControls: true,
        panToLocation: false,
        zoom: 15
      }
    };
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    // eslint-disable-next-line no-undef
    /*navigator.geolocation.getCurrentPosition(
      (location) => {
        const markers = this.createRandomMarkers(location.coords, 1, 50000);
        this.setState({
          markers,
          location,
          mapCenterPosition: [location.coords.latitude, location.coords.longitude],
          currentLocation: [location.coords.latitude, location.coords.longitude]
        });        
      },
      (error) => Alert.alert(error.message),
      { 
          enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
       }
    );*/
  };

  // create set of location objects centered around the current user location
  createRandomMarkers = (center, numberOfMarkers, radius) => {
    const newMarkers = [];
    for (let i = 0; i < numberOfMarkers; i++) {
      // get a random location centered around the current postion
      const x0 = center.longitude;
      const y0 = center.latitude;

      const r = radius / 111300; // = 100 meters

      const u = Math.random();
      const v = Math.random();
      const w = r * Math.sqrt(u);
      const t = 2 * Math.PI * v;
      const x = w * Math.cos(t);
      const y1 = w * Math.sin(t);
      const x1 = x / Math.cos(y0);

      const foundLatitude = y0 + y1;
      const foundLongitude = x0 + x1;

      newMarkers.push({
        id: i + 200,
        // coords: [33.946, -91.000],
        coords: [foundLatitude, foundLongitude],
        icon: '✖️',
        animation: {
          name: animations[Math.floor(Math.random() * animations.length)],
          duration: Math.floor(Math.random() * 3) + 1,
          delay: Math.floor(Math.random()) * 0.5,
          interationCount
        }
      });
    }
    return newMarkers;
  };

  componentDidUpdate = () => {};

  updateMarkerSpeed = () => {
    // // console.log('altering markers');
    const updateMarkers = this.state.markers.map((location) => {
      const updatedLocation = Object.assign({}, location, {
        animation: Object.assign({}, location.animation, {
          duration: location.animation.duration + 0.5
        })
      });
      return updatedLocation;
    });
    this.setState({ markers: updateMarkers });
  };

  onMapClicked = ({ payload }) => {
    // // debugger;
    console.log(`Map Clicked: app received: ${payload.coords}`);
    this.showAlert('Map Clicked', `Coordinates = ${payload.coords}`);
  };

  onMapMarkerClicked = ({ payload }) => {
    // // debugger;
    console.log(`Marker Clicked: ${payload.id}`);
    this.showAlert('Marker Clicked', `Marker ID = ${payload.id}`);
    this.setState(
      {
        clickedMarkerID: payload.id,
        markers: this.state.markers.map((location) => {
          if (location.id === payload.id) {
            return {
              ...location,
              icon: '✖️'
            };
          }
          return location;
        })
      },
      () => {
        // send the updated locations
        /* this.webViewLeaflet.sendMessage({
          locations: this.state.locations
        }); */
      }
    );
  };

  setEmojiForMarker = () => {
    // debugger;
  };
  onCloseEmojiSelectorModal = () => {
    this.setState({ showEmojiSelectorModal: false });
  };
  onOpenEmojiSelectorModal = () => {
    this.setState({ showEmojiSelectorModal: true });
  };

  showAlert = (title, body) => {
    Alert.alert(
      title,
      body,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  onZoomLevelsChange = (event) => {
    console.log('onZoomLevelsChange received : ', event);
  };
  onResize = (event) => {
    console.log('onResize received : ', event);
  };
  onUnload = (event) => {
    console.log('onUnload received : ', event);
  };
  onViewReset = (event) => {
    console.log('onViewReset received : ', event);
  };
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
          [40.203076, 29.060499],
          [40.40, 29.08]
        ],
        boundsOptions: { padding: [50, 50] }
      });
    }, 1000);
  };
  onZoomStart = (event) => {
    console.log('onZoomEnd received : ', event);
  };
  onMoveStart = (event) => {
    console.log('onMoveStart received : ', event);
  };
  onZoom = (event) => {
    console.log('onZoom received : ', event);
  };
  onMove = (event) => {
    console.log('onMove received : ', event);
  };
  onZoomEnd = (event) => {
    console.log('onZoomEnd received : ', event);
  };
  onMoveEnd = () => {
    // have to set the bounds at the end of the initial onMove event
    if (!this.state.initialBoundsSet) {
      // this.setBoundsForAllMarkers();
      this.setState({ initialBoundsSet: true });
    }
  };

  onCurrentPositionClicked = () => {
    // console.log("onCurrentPositionClicked received");
  };

  centerMap = (parkInitials) => {
    // console.log(parkInitials);
    switch (parkInitials) {
      case 'dw':
        this.setState({ mapCenterPosition: parkLocations.dw });
        break;
      case 'bg':
        this.setState({ mapCenterPosition: parkLocations.bg });
        break;
      case 'kd':
        this.setState({ mapCenterPosition: parkLocations.kd });
        break;
      default:
        break;
    }
  };

  // update the map object in the component's state
  onUpdateMapState = (data) => {
    this.setState({
      ...this.state,
      mapState: { ...this.mapState, ...data }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <WebViewLeaflet
          ref={(component) => (this.webViewLeaflet = component)}
          onLoad={this.onLoad}
          eventReceiver={this} // the component that will receive map events
          centerPosition={this.state.mapCenterPosition}
          markers={this.state.markers}
          mapLayers={mapLayers}
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
            text={'🏰'}
          />
          <Button
            onPress={() => this.centerMap('bg')}
            borderWidth={0}
            fontSize={30}
            text={'👍'}
          />
          <Button
            onPress={() => this.centerMap('kd')}
            borderWidth={0}
            fontSize={30}
            text={'👑'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00ffff',

    display: 'flex'
  },
  controlButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'dodgerblue'
  }
});
