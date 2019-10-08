import React from 'react';
import { Text, View } from 'react-native';

class MyRecipesScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>My Recipes</Text>
        </View>
      );
    }
  }

export default MyRecipesScreen;