import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button} from 'native-base';

const SearchBar = ({ currIngredient, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.searchBar}>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={true}
                style={styles.input}
                placeholder="Type to Add Ingredient to List" 
                value ={currIngredient}
                onChangeText={(newIngred) => onTermChange(newIngred)}
            />
            <View>
                <Button 
                    rounded dark
                    style={styles.addButton}
                    onPress={() => onTermSubmit(currIngredient)}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </Button>
            </View>
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
        marginBottom: 5,
        width: 345
    },
    input: {
        flex: 1,
        fontSize: 18
    },
    addButton: {
        marginTop: 2,
        width: 60,
        justifyContent: 'center',
        marginHorizontal: 7,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F2C04C',
    },
})

export default withNavigation(SearchBar);