import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import RecipeDetail from './RecipeDetail';

const UserPastRecipesList = ({ allRecipes, navigation }) => {
  allRecipes = allRecipes.filter(recipe => {
    return recipe.id !== 0;
  })

  return (
    <View style={{marginTop: 10}}>
      <FlatList
        data={allRecipes}
        keyExtractor={singleRecipe => String(singleRecipe.id) + 'pastRecipes'}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SingleRecipe', { recipe: item })
              }
            >
              <RecipeDetail recipe={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default withNavigation(UserPastRecipesList);