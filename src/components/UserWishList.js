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

const UserWishList = ({ allRecipes, navigation }) => {
  return (
    <View style={{marginBottom: 100}}>
      <FlatList
        data={allRecipes}
        keyExtractor={singleRecipe => String(singleRecipe.id) + 'wishList'}
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

export default withNavigation(UserWishList);