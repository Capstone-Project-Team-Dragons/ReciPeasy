import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SPOON_API } from 'react-native-dotenv';
import spoonacular from '../api/spoonacular';

import { connect } from 'react-redux';
import {
  getCurrentUser,
  getPastRecipesThunk,
  addToPastRecipesThunk,
  getWishListThunk,
  addToWishListThunk
} from '../store/actionCreators';

class SingleRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.searchInstructionAndAddiInfoData = this.searchInstructionAndAddiInfoData.bind(
      this
    );
    this.searchInstructionApi = this.searchInstructionApi.bind(this);
    this.addToWishList = this.addToWishList.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentUser();
  }

  searchInstructionAndAddiInfoData = async (userId, recipeId, isLoggedIn) => {
    const recipe = this.props.navigation.getParam('recipe');
    let url = `/${recipeId}/information?apiKey=${SPOON_API}`;
    const addtionalInfoData = await this.searchInstructionApi(url);
    if (isLoggedIn === true) {
      this.props.addToPastRecipesThunk(
        userId,
        recipe.id,
        recipe.title,
        recipe.image
      );
    }
    this.props.navigation.navigate('Instruction', {
      addtionalInfo: addtionalInfoData,
    });
  };

  searchInstructionApi = async url => {
    try {
      const { data } = await spoonacular.get(url);
      return data;
    } catch (error) {
      console.log('Error! ', error);
    }
  };

  addToWishList = (userId, recipeId, title, image) => {
    try{
      this.props.addToWishListThunk(userId, recipeId, title, image);
    }
    catch(error){
      console.log('Error! ', error);
    }
  };


  render() {
    const { currentUser } = this.props;
    const recipe = this.props.navigation.getParam('recipe');
    let isLoggedIn = false;
    if (currentUser !== undefined && currentUser.id) {
      isLoggedIn = true;
      this.props.getPastRecipesThunk(currentUser.id);
    }
    const { pastRecipes } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.recipeNameTitle}>Recipe: {recipe.title}</Text>
        <Image style={styles.imageStyle} source={{ uri: recipe.image }} />
        <Text style={styles.recipeName}>
          Total Used Ingredient(s): {recipe.usedIngredientCount}{' '}
        </Text>

        <FlatList
          data={recipe.usedIngredients}
          style={styles.displayList}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.imageIngredientStyle}
                  source={{ uri: item.image }}
                />
                <Text style={styles.recipeIngredientName}>
                  Name: {item.name}
                </Text>
                <Text style={styles.recipeIngredientName}>
                  Quantity Need: {item.original}
                </Text>
              </View>
            );
          }}
        />

        
       {currentUser === undefined || !currentUser.id ? null :  
            <TouchableOpacity
                horizontal={true}
                style={styles.searchRecipeButton}
                onPress={() => this.addToWishList(currentUser.id,recipe.id, recipe.title, recipe.image)}
            >
                <Text style={styles.buttonText}>Add to Wish List</Text>
            </TouchableOpacity> 
       }
        <TouchableOpacity
          horizontal={true}
          style={styles.searchRecipeButton}
          onPress={() =>
            this.searchInstructionAndAddiInfoData(
              currentUser.id,
              recipe.id,
              isLoggedIn
            )
          }
        >
          <Text style={styles.buttonText}>Instruction Details</Text>
        </TouchableOpacity>
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
    getPastRecipesThunk: userId => dispatch(getPastRecipesThunk(userId)),
    addToPastRecipesThunk: (userId, recipeId, recipeTitle, recipeImage) =>
      dispatch(
        addToPastRecipesThunk(userId, recipeId, recipeTitle, recipeImage)
      ),
    getWishListThunk: userId => dispatch(getWishListThunk(userId)),
    addToWishListThunk: (userId, recipeId, recipeTitle, recipeImage) =>
      dispatch(
        addToWishListThunk(userId, recipeId, recipeTitle, recipeImage)
      )
  };
};

const styles = StyleSheet.create({
  //by default an image wants to collapse itself
  container: {
    marginLeft: 15,
  },
  recipeName: {
    fontWeight: 'bold',
  },
  displayList: {
    marginTop: 5,
    marginLeft: 15,
  },
  imageStyle: {
    height: 120,
    width: 250,
    borderRadius: 5,
    margin: 5,
    marginBottom: 15,
  },
  imageIngredientStyle: {
    height: 80,
    width: 100,
    borderRadius: 5,
    padding: 5,
  },
  recipeNameTitle: {
    fontWeight: 'bold',
    margin: 5,
  },
  recipeIngredientName: {
    fontSize: 12,
  },
  searchRecipeButton: {
    backgroundColor: '#66ccff',
    height: 30,
    borderRadius: 5,
    marginHorizontal: 100,
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRecipeScreen);
