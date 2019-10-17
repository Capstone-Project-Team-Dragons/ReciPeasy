import React from 'react';
import {
    View,
    Text,
    FlatList,
  } from 'react-native';
  import styles from '../styles/SingleRecipeStyle';

const UsedIngredientsFromList = ({ recipe }) => {

    formatIngredientName = ingredient => {
        let formatted = ingredient[0].toUpperCase() + ingredient.slice(1);
        return formatted;
      };

    return (
        <View>
            <Text style={styles.recipeName}>
                Total Used Ingredient(s) from Your List: {recipe.usedIngredientCount}{' '}
            </Text>

            <FlatList
                data={recipe.usedIngredients}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item, index }) => {
                return (
                    <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        {index + 1}. {formatIngredientName(item.name)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.recipeIngredientName}>
                        {item.originalString}
                        </Text>
                    </View>
                    </View>
                );
                }}
            />
        </View>
    )
}

export default UsedIngredientsFromList;