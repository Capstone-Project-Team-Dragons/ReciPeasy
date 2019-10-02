import React from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';

const SearchBar = ({ currIngredient, onTermChange, onTermSubmit }) => {
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
    }
})

export default SearchBar;