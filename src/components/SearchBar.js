import React from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; 
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const SearchBar = ({ currIngredient, onTermChange, onTermSubmit, navigation }) => {
    return (
        <View style={styles.searchBar}>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={true}
                style={styles.input}
                placeholder='Search Ingredient' value ={currIngredient}
                onChangeText={(newIngred) => onTermChange(newIngred)}
                onEndEditing={() => onTermSubmit()}
            />
            <TouchableOpacity onPress={() => navigation.navigate('BarcodeScanner', {submit: onTermSubmit})}>
                <Feather name='camera' size={15} style={styles.iconStyle}/>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#cccccc',
        height: 50,
        borderRadius: 5, 
        marginHorizontal: 15,
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    input: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})

export default withNavigation(SearchBar);