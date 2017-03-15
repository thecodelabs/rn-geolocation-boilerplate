'use strict';

import React, { Component } from 'react';

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