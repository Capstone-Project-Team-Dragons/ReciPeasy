import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import { withNavigation } from 'react-navigation';

const SearchBar = ({ currIngredient, onTermChange }) => {
    return (
        <View style={styles.searchBar}>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={true}
                style={styles.input}
                placeholder="Type to Add Ingredient to List" value ={currIngredient}
                onChangeText={(newIngred) => onTermChange(newIngred)}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#cccccc',
        height: 50,
        borderRadius: 5, 
        marginHorizontal: 15,
        width: 275,
        marginTop: 15,
        marginBottom: 5
    },
    input: {
        flex: 1,
        fontSize: 18
    }
})

export default withNavigation(SearchBar);