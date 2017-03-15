'use strict';

import React, { Component } from 'react';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';

class App extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	lng: 0.0,
	  	lat: 0.0
	  };
	}
	watchID: ?number = null;

	componentDidMount() {
		if(Platform.OS === 'ios') {
			navigator.geolocation.getCurrentPosition(
				(position)=> {
					this.setState({lng: position.coords.longitude, lat: position.coords.latitude});

				},
				(error)=> console.log (JSON.stringify(error)),
				{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
			);
			this.watchID = navigator.geolocation.watchPosition((position) => {
	      this.setState({lng: position.coords.longitude, lat: position.coords.latitude});
	    });
		}
		LocationServicesDialogBox.checkLocationServicesIsEnabled({
		    message: "<h2>Use Location</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location to improve it's services",
		    ok: "YES",
		    cancel: "NO"
			}).then((success)=> {
				navigator.geolocation.getCurrentPosition(
					(position)=> {
						this.setState({lng: position.coords.longitude, lat: position.coords.latitude});

					},
					(error)=> console.log (JSON.stringify(error)),
					{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
				);
				this.watchID = navigator.geolocation.watchPosition((position) => {
		      this.setState({lng: position.coords.longitude, lat: position.coords.latitude});
		    });
			}).catch((error) => {
			  this.setState({status: error})
			});
		
	}
	
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.header}>Location Tracker</Text>
      	<View>
      		<Text>
	          <Text style={styles.title}>Longitude: </Text>
	          {this.state.lng}
        	</Text>
        	<Text>
	          <Text style={styles.title}>Latitude: </Text>
	          {this.state.lat}
        	</Text>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		fontSize: 30
	},
	location: {
		fontSize: 20
	}
});


export default App;