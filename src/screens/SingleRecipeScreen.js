import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import { Toast, Button } from 'native-base';
import { SPOON_API } from 'react-native-dotenv';
import spoonacular from '../api/spoonacular';
import { connect } from 'react-redux';

import styles from '../styles/SingleRecipeStyle';

import { getCurrentUser } from '../store/usersReducer';
import { addToPastRecipesThunk } from '../store/pastRecipesReducer';
import {
  getWishListFromStore,
  getWishListThunk,
  addToWishListThunk,
  removeFromWishListThunk,
} from '../store/wishListReducer';

class SingleRecipeScreen extends React.Component {
  isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      additionalInfo: [],
      prepTime: 0,
      servings: 0
    }
    this.searchInstructionAndAddiInfoData = this.searchInstructionAndAddiInfoData.bind(
      this
    );
    this.addToWishList = this.addToWishList.bind(this);
    this.removeFromWishList = this.removeFromWishList.bind(this);
    this.displayLogicHandler = this.displayLogicHandler.bind(this);
    this.addToPastRecipes = this.addToPastRecipes.bind(this);
  }

  searchInstructionAndAddiInfoData = async (recipeId) => {
    let url = `/${recipeId}/information?apiKey=${SPOON_API}`;
    try {
      const additionalInfoData = await spoonacular.get(url);

      if(additionalInfoData && additionalInfoData.data["analyzedInstructions"].length > 0) {
        this.setState({
          prepTime: additionalInfoData.data["readyInMinutes"],
          servings: additionalInfoData.data["servings"],
          additionalInfo: additionalInfoData.data["analyzedInstructions"]
        })
      } 
    } catch (error) {
      console.log('Error', error)
    }
  };

  addToPastRecipes(userId, isLoggedIn) {
    const recipe = this.props.navigation.getParam('recipe');

    if (isLoggedIn === true) {
      this.props.addToPastRecipesThunk(
        userId,
        recipe.id,
        recipe.title,
        recipe.image
      );
    }

    this.props.navigation.navigate('Instruction', {
      additionalInfo: this.state.additionalInfo,
      prepTime: this.state.prepTime,
      servings: this.state.servings
    });

  }

  addToWishList = async (
    userId,
    recipeId,
    title,
    image,
    isRecipeInWishList
  ) => {
    try {
      if (isRecipeInWishList === true) {
        // alreay exists
        Toast.show({
          text: `${title} already exists in your Wish List!`,
          buttonText: 'Okay',
          duration: 3000,
          type: 'warning',
        });
      } else {
        // add to the wishlist
        this.props.addToWishListThunk(userId, recipeId, title, image);
        Toast.show({
          text: `${title} has been added successfully to your Wish List!`,
          buttonText: 'Okay',
          duration: 3000,
          type: 'success',
        });
      }
    } catch (error) {
      console.log('Error! ', error);
    }
  };

  removeFromWishList = (userId, recipeId, title) => {
    this.props.removeFromWishListThunk(userId, recipeId);
    Toast.show({
      text: `${title} has been removed successfully from your Wish List.`,
      buttonText: 'Okay',
      duration: 3000,
      type: 'danger',
    });
  };

  // Function to check if current user is logged in
  // and if the given recipe is in user's wish list
  displayLogicHandler(recipeId) {
    this.props.getCurrentUser();
    this.props.getWishListFromStore();
    let isLoggedIn = false;
    let isRecipeInWishList = false;

    const { currentUser, wishList } = this.props;

    if (currentUser !== undefined && currentUser.id) {
      isLoggedIn = true;
      //If wish list is empty,
      if (JSON.stringify(wishList) === JSON.stringify([])) {
        // try to retrieve it from database
        this.props.getWishListThunk(currentUser.id);
      }

      let recipeArr = this.props.wishList.filter(
        elemObj => elemObj.id === recipeId
      );

      if (recipeArr.length === 1) {
        isRecipeInWishList = true;
      }
    }
    return { isLoggedIn, isRecipeInWishList };
  }

  formatIngredientName = ingredient => {
    let formatted = ingredient[0].toUpperCase() + ingredient.slice(1);
    return formatted;
  };

  componentDidMount() {
    this.isMounted = true;

    const recipe = this.props.navigation.getParam('recipe');
    this.searchInstructionAndAddiInfoData(recipe.id);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    const { currentUser } = this.props;
    const recipe = this.props.navigation.getParam('recipe');

    let displayFlags = this.displayLogicHandler(recipe.id);

    return (
      <View style={styles.container}>
        <Text style={styles.recipeNameTitle}>
          {this.formatIngredientName(recipe.title)}
        </Text>
        <Image style={styles.imageStyle} source={{ uri: recipe.image }} />

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
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    {index + 1}. {this.formatIngredientName(item.name)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontSize: 14,
                      marginLeft: 15,
                    }}
                  >
                    More Information:
                  </Text>
                  <Text style={styles.recipeIngredientName}>
                    {item.originalString}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <Text style={styles.recipeName}>
          Remaining Ingredient(s) You Will Need: {recipe.missedIngredientCount}{' '}
        </Text>

        <FlatList
          data={recipe.missedIngredients}
          keyExtractor={(item, index) => 'key12' + index}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    {index + 1}. {this.formatIngredientName(item.name)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontSize: 14,
                      marginLeft: 15,
                    }}
                  >
                    More Information:
                  </Text>
                  <Text style={styles.recipeIngredientName}>
                    {item.originalString}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {displayFlags.isLoggedIn === false ? null : (
          <View>
            {displayFlags.isRecipeInWishList === false ? (
              <Button
                rounded
                success
                style={styles.button}
                onPress={() =>
                  this.addToWishList(
                    currentUser.id,
                    recipe.id,
                    recipe.title,
                    recipe.image,
                    displayFlags.isRecipeInWishList
                  )
                }
              >
                <Text style={styles.buttonText}>Add to Wish List</Text>
              </Button>
            ) : (
              <Button
                rounded
                danger
                style={styles.button}
                onPress={() =>
                  this.removeFromWishList(
                    currentUser.id,
                    recipe.id,
                    recipe.title
                  )
                }
              >
                <Text style={styles.buttonText}>Remove from Wish List</Text>
              </Button>
            )}
          </View>
        )}

        {
          this.state.additionalInfo.length > 0 ? 
            (
              <Button
                rounded
                dark
                style={styles.button}
                onPress={() =>
                  this.addToPastRecipes(
                    currentUser.id,
                    displayFlags.isLoggedIn
                  )
                }
              >
                <Text style={styles.buttonText}>Recipe Instructions</Text>
              </Button>
            ) : null
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.usersReducer.currentUser,
    pastRecipes: state.pastRecipesReducer.pastRecipes,
    wishList: state.wishListReducer.wishList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),

    addToPastRecipesThunk: (userId, recipeId, recipeTitle, recipeImage) =>
      dispatch(
        addToPastRecipesThunk(userId, recipeId, recipeTitle, recipeImage)
      ),

    getWishListThunk: userId => dispatch(getWishListThunk(userId)),
    getWishListFromStore: () => dispatch(getWishListFromStore()),
    addToWishListThunk: (userId, recipeId, recipeTitle, recipeImage) =>
      dispatch(addToWishListThunk(userId, recipeId, recipeTitle, recipeImage)),
    removeFromWishListThunk: (userId, recipeId) =>
      dispatch(removeFromWishListThunk(userId, recipeId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRecipeScreen);
