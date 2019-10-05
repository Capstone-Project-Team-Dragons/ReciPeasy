import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BUYCOTT_API } from 'react-native-dotenv';
import buycott from '../api/buycott';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { withNavigation } from 'react-navigation';


const BarcodeScannerScreen = ({ navigation }) => {
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataFromBarcode, setDataFromBarcode] = useState('');

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      setCameraPermission(true);
    }
  };

  const searchBarcodeApi = async (barcode) => {
    try {
      const {data} = await buycott.get('/', {
        params: {
          barcode: barcode,
          access_token: BUYCOTT_API
        }
      });
      console.log('data', data)
      if(data.products[0].product_name) {
        console.log('HERE', typeof(data.products[0].product_name));
        
        ( () => { setDataFromBarcode('Keebler'); } )()
        console.log('data in barcode', dataFromBarcode);
        navigation.navigate('Search', {ingredientName: dataFromBarcode});
      }
    } catch (error) { 
      console.log('Error!, ', error)
    }
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    searchBarcodeApi(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);    
  };

  useEffect(() => {
    getPermissionsAsync();
    // searchBarcodeApi('070129290781');
  })

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}

export default withNavigation(BarcodeScannerScreen);