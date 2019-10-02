import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity 
} from 'react-native';
import { withNavigation } from 'react-navigation';

const RecipeList = ({ allRecipes }) => {

    return (
        <View>
            <FlatList
                data={allRecipes}
                keyExtractor={(singleRecipe) => singleRecipe}
                renderItem={({ item }) =>{
                    return (
                        <Text key={item.id}>{item.title} - {item.id}</Text>
                    )
                }}
            />
        </View>
    )
}

export default RecipeList;

