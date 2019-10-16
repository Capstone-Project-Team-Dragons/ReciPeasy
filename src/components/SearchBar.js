import React from 'react';
import {View, TextInput, Text} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button} from 'native-base';
import styles from '../styles/SearchBarStyle';

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

export default withNavigation(SearchBar);