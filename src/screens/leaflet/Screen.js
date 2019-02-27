import React from 'react';
import { View } from 'react-native';
import WebViewLeaflet from "react-native-webview-leaflet";

//Fingerprint
export default class Screen extends React.Component {

    state = {}

    componentWillMount() {      
    }

    componentWillUnmount() {
    }

    render() {
        return (<View style={{ flex: 1 }}>
            <WebViewLeaflet
              ref={component => (this.webViewLeaflet = component)}
              // Optional: a callback that will be called when the map is loaded
              //onLoad={this.onLoad}
    
              // Optional: the component that will receive map events}
              eventReceiver={this} 
    
              // Optional: the center of the displayed map
              //centerPosition={this.state.mapCenterPosition}
    
              // Optional: a list of markers that will be displayed on the map
              //markers={this.state.markers}
    
              // Required: the map layers that will be displayed on the map. See below for a description of the map layers object
              mapLayers={{
                name: 'streets',  // the name of the layer, this will be seen in the layer selection control
                checked: 'true',  // if the layer is selected in the layer selection control
                type: 'TileLayer',  // the type of layer as shown at https://react-leaflet.js.org/docs/en/components.html#raster-layers
                baseLayer: true,
                // url of tiles
                url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${'pk.eyJ1IjoiZWNkdW5kYXIiLCJhIjoiY2pzbTd3ZTNmMW81MjQ5b2xlOWk2anZnMSJ9.OKOnO6b7mG1-LSVEtzMxFQ'}`,
                // attribution string to be shown for this layer
                attribution:'&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
              }}
    
              // Optional: display a marker to be at a given location
              /*ownPositionMarker={{
                coords: this.state.currentLocation,
                icon: "❤️",
                size: [24, 24],
                animation: {
                  name: "pulse",
                  duration: ".5",
                  delay: 0,
                  interationCount: "infinite"
                }
              }}*/
    
              // Optional (defaults to false): display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
              centerButton
    
              // Optional (defaults to false): cluster icons that are in the same area
              useMarkerClustering
            />
          </View>);
    }
}
