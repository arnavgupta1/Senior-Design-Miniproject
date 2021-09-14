'use strict';
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

class App extends Component {
  state = {
    count: 0,
    info: ""
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
        <View style={styles.container}>
        <RNCamera
          style={{ flex: 1, alignItems: 'center' }}
          ref={ref => {
            this.camera = ref
          }}
        />
        </View>
      </View>
    )
  }
}

const getFDAInfo = () => {
  return fetch('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=rWlpngARJ42WBd8Fv1wkfZ7v2HIVqikmev24VKeZ')
    .then((response) => response.json())
    .then((json) => {
      info: json.name;
    })
    .catch((error) => {
      console.error(error);
    });
};

useEffect(() => {
  getFDAInfo();
}, []);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;