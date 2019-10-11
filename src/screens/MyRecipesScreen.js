import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import db from '../api/db/database';
import { FlatList } from 'react-native-gesture-handler';

class MyRecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      pastRecipes: {},
    };
    this.getUserPastRecipes = this.getUserPastRecipes.bind(this);
    this.insertRecipe = this.insertRecipe.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const id = this.props.navigation.getParam('userId');
    if (id !== prevState.userId) {
      console.log('In componentDidUpdate');
      this.getUserPastRecipes(id);
    }
  }

  insertRecipe(doc, listName, id) {
    let objectCopy;
    if (listName === 'pastRecipes') {
      objectCopy = Object.create(this.state.pastRecipes);
      objectCopy[`${doc.id}`] = doc.data();
      console.log('objectCopy', objectCopy);
      this.setState({
        userId: id,
        pastRecipes: objectCopy,
      });
    }
  }

  getUserPastRecipes = id => {
    try {
      db.collection('users')
        .doc(`${id}`)
        .collection('pastRecipes')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            if (!this.state.pastRecipes.hasOwnProperty(`${doc.id}`)) {
              this.insertRecipe(doc, 'pastRecipes', id);
            }
          });
        });
    } catch (error) {
      console.log('Error!', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.navigation.state.params === undefined ? (
          <TouchableOpacity
            horizontal={true}
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Login or Sign-Up</Text>
          </TouchableOpacity>
        ) : Object.keys(this.state.pastRecipes).length === 0 ? (
          <Text>No Recipes to Show! Please Add Recipes</Text>
        ) : Object.keys(this.state.pastRecipes).length > 0 ? (
          <FlatList
            data={Object.keys(this.state.pastRecipes)}
            keyExtractor={recipeId => recipeId}
            renderItem={({ item }) => {
              return (
                <Text>
                  Recipe ID: {this.state.pastRecipes[item]['recipeId']}
                </Text>
              );
            }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#66ccff',
    height: 40,
    borderRadius: 5,
    marginHorizontal: 50,
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withNavigation(MyRecipesScreen);
