import React from 'react';
import {
    View,
    Text,
    FlatList,
  } from 'react-native';
  import styles from '../styles/SingleRecipeStyle';

  const AllIngredientsList = ({ extendedIngredients }) => {
      return (
          <View>
              <FlatList
                data={extendedIngredients}
                keyExtractor={(item, index) => 'key12' + index}
                renderItem={({ item, index }) => {
                    return (
                    <View style={styles.container}>
                        <Text style={styles.recipeIngredientName}>
                            {item["originalString"]}
                        </Text>
                    </View>
                    );
                }}
            />
          </View>
      )
  }

  export default AllIngredientsList