import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import RecipeDetail from './RecipeDetail';

const RecipeList = ({ allRecipes, navigation }) => {
  return (
    <View>
      <FlatList
        data={allRecipes}
        keyExtractor={singleRecipe => String(singleRecipe.id)}
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

export default withNavigation(RecipeList);
