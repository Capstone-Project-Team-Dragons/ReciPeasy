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

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      setCameraPermission(true);
    }
  };

  // Search Buycott API to retrieve the product name, for which the user has scanned the barcode.
  const searchBarcodeApi = async barcode => {
    try {
      const { data } = await buycott.get('/', {
        params: {
          barcode: barcode,
          access_token: BUYCOTT_API,
        },
      });
      let productName;
      // If we have a product name,
      if (data.products[0].product_name) {
        // Extract the product name.
        productName = data.products[0].product_name;
        console.log('productname, ', productName)
        // Navigate back to Search screen with the found product name.
        const getHandler = navigation.getParam('handleBarcode');
        console.log('productName', productName);
        getHandler(productName);
        navigation.navigate('Search', { ingredientName: productName });
        navigation.setParams({ ingredientName: null });
      }
    } catch (error) {
      console.log('Error!, ', error);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    searchBarcodeApi(data);
  };

  useEffect(() => {
    getPermissionsAsync();
  });

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
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default withNavigation(BarcodeScannerScreen);
