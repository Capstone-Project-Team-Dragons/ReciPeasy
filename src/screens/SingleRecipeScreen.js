import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SPOON_API } from 'react-native-dotenv';
import spoonacular from '../api/spoonacular';
import { connect } from 'react-redux';
import {getCurrentUser, getPastRecipesThunk, addToPastRecipesThunk, getWishListThunk, 
  getWishListThunkByRecipeId, addToWishListThunk, removeFromWishListThunk} from '../store/actionCreators';

class SingleRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.searchInstructionAndAddiInfoData = this.searchInstructionAndAddiInfoData.bind(this);
    this.addToWishList = this.addToWishList.bind(this);
    this.removeFromWishList = this.removeFromWishList.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentUser();
    const recipe = this.props.navigation.getParam('recipe');
    this.props.getWishListThunkByRecipeId(this.props.currentUser.id, recipe.id);
  }

  searchInstructionAndAddiInfoData = async (userId, recipeId, isLoggedIn) => {
    const recipe = this.props.navigation.getParam('recipe');
    let url = `/${recipeId}/information?apiKey=${SPOON_API}`;
    const addtionalInfoData = await spoonacular.get(url);
    if (isLoggedIn === true) {
      this.props.addToPastRecipesThunk(userId, recipe.id, recipe.title,recipe.image);
    }
    this.props.navigation.navigate('Instruction', {
      addtionalInfo: addtionalInfoData,
    });
  };

  addToWishList = async (userId, recipeId, title, image) => {
    try{
      // check if it is in wishlist
      let isExsits = false;
      let { wishList } = this.props;
      if ( wishList !== undefined &&  Object.entries(wishList).length > 0 && wishList["id"] == recipeId){
         isExsits = true;
      }
      else {
        // dispatch
        await this.props.getWishListThunkByRecipeId(userId, recipeId);
        wishList = this.props.wishList;
        if(wishList !== undefined && Object.entries(wishList).length > 0){
          isExsits = true;
        }
      }
    
      if (isExsits){
        // alreay exists
        alert(`Recipe: ${title} already exists in your Wish List.`);
      }
      else {
        // add to the wishlist
        this.props.addToWishListThunk(userId, recipeId, title, image);
        alert(`Recipe: ${title} has been added successfully to your Wish List.`);
      }
    }
    catch(error){
      console.log('Error! ', error);
    }
  };

  removeFromWishList = (userId, recipeId, title) => {
    this.props.removeFromWishListThunk(userId, recipeId);
    alert(`Recipe: ${title} has been removed successfully from your Wish List.`);
  }

  render() {
    const { currentUser } = this.props;
    const recipe = this.props.navigation.getParam('recipe');
    let isLoggedIn = false;
    if (currentUser !== undefined && currentUser.id) {
      isLoggedIn = true;
      this.props.getPastRecipesThunk(currentUser.id);
    }
    const { pastRecipes } = this.props;
    const { wishList } = this.props;

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
            <View>
                {wishList === undefined || Object.entries(wishList).length <= 0 ?
                  <TouchableOpacity
                      horizontal={true}
                      style={styles.searchRecipeButton}
                      onPress={() => this.addToWishList(currentUser.id,recipe.id, recipe.title, recipe.image)}
                  >
                      <Text style={styles.buttonText}>Add to Wish List</Text>
                  </TouchableOpacity>
                :
                    <TouchableOpacity
                        horizontal={true}
                        style={styles.searchRecipeButton}
                        onPress={() => this.removeFromWishList(currentUser.id,recipe.id, recipe.title)}
                    >
                        <Text style={styles.buttonText}>Remove from Wish List</Text>
                  </TouchableOpacity> 
                }
           </View>
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
    getWishListThunkByRecipeId: (userId, recipeId) => dispatch(getWishListThunkByRecipeId(userId, recipeId)),
    addToWishListThunk: (userId, recipeId, recipeTitle, recipeImage) =>
      dispatch(
        addToWishListThunk(userId, recipeId, recipeTitle, recipeImage)
      ),
    removeFromWishListThunk: (userId, recipeId) =>
      dispatch(
        removeFromWishListThunk(userId, recipeId)
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
