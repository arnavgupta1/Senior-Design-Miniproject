import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,  StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Scan a barcode')

  const askForCameraPermission = () => {
      (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
      })()
  }

  // Get camera access 
  useEffect(() => {
      askForCameraPermission();
  }, []);

  // scan the barcode // 'data' is the barcode number here
  function handleBarCodeScanned({ type, data }) {
      setScanned(true);
      setText(data)
      console.log('Type: ' + type + '\nBarcode: ' + data)
      return data;
  };

  // makesure cameraaccess is available
  if (hasPermission === null) {
      return (
          <View style={styles.container}>
              <Text>Requesting for camera permission</Text>
          </View>)
  }
  if (hasPermission === false) {
      return (
          <View style={styles.container}>
              <Text style={{ margin: 10 }}>No access to camera</Text>
              <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
          </View>)
  }

  const getFoodInfo = async () => {
     try {
      const response = await fetch('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=rWlpngARJ42WBd8Fv1wkfZ7v2HIVqikmev24VKeZ');
      const json = await response.json();
      console.log(json.find(handleBarCodeScanned))
      setFoodData(json.find(handleBarcodeScanned));
      // setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFoodInfo();
  }, [foodData]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={foodData}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={({ item }) => (
            // <Text>Name = {item.description}</Text>
            data.map(item => {
              <Text>{item.description}</Text>;
            })
          )}
        />
      )}
    <View style={styles.container}>
    <View style={styles.barcodebox}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
    </View>
    <Text style={styles.maintext}>{text}</Text>

    {scanned && <Button title={'Scan another barcode'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  maintext: {
      fontSize: 16,
      margin: 20,
  },
  barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
  }
});
