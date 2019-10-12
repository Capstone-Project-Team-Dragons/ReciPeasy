import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import SearchIngredientsScreen from '../screens/SearchIngredientsScreen';


const WelcomeScreen = ({ navigation }) => {
    console.log(navigation);
    return (
        <View style={{flex: 1, flexDirection: 'column',}}>
            <TouchableOpacity  onPress={() => navigation.navigate('Search')}> 
                <View style={{ height: '0%', backgroundColor: 'steelblue'}} >
                </View>
                <View style={{ height: '80%'}} >
                    <Image style={{ height: '100%', width : '100%'}} source={require("../screens/Pic1.jpg")} />
                </View>
                <View style={{ height: '20%', backgroundColor: 'powderblue', padding: 30, paddingLeft: 40}} >
                    <Text style={{ fontFamily: 'Cochin-BoldItalic', fontSize: 28, color: 'darkblue', }}> 
                        Welcome to the Ingredia
                    </Text>
                </View>
            </TouchableOpacity> 
        </View>
      
    )
}

export default WelcomeScreen