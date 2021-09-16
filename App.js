// 'use strict';
// import React, { Component } from 'react'
// import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// class App extends Component {
//   state = {
//     count: 0,
//     info: ""
//   }

//   onPress = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }

//   const getFDAInfo = async() => {
//     return fetch('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=rWlpngARJ42WBd8Fv1wkfZ7v2HIVqikmev24VKeZ')
//       .then((response) => response.json())
//       .then((json) => {
//         info: json;
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     getFDAInfo();
//   }, []);

//  render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//          style={styles.button}
//          onPress={this.onPress}
//         >
//          <Text>Click me</Text>
//         </TouchableOpacity>
//         <View>
//           <Text>
//             You clicked { this.state.count } times
//           </Text>
//           <Text>
//             JSON INFO : { this.state.info }
//           </Text>
//         </View>
//         <View style={styles.container}>
//         <RNCamera
//           style={{ flex: 1, alignItems: 'center' }}
//           ref={ref => {
//             this.camera = ref
//           }}
//         />
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     marginBottom: 10
//   }
// })

// export default App;


import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const getFoodInfo = async () => {
     try {
      const response = await fetch('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=rWlpngARJ42WBd8Fv1wkfZ7v2HIVqikmev24VKeZ');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  // const getItemCount = (data) => 300;

  useEffect(() => {
    getFoodInfo();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => (
            // <Text>Name = {item.description}</Text>
            data.map(item => {
              <Text>{item[0]}</Text>;
            })
          )}
        />
      )}
    </View>
  );
};
