import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Toast, Button } from 'native-base';
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
        //alert(`Recipe: ${title} already exists in your Wish List.`);
        Toast.show({
          text: `${title} already exists in your Wish List!`,
          buttonText: 'Okay',
          duration: 3000,
          type: 'warning'
        })
      }
      else {
        // add to the wishlist
        this.props.addToWishListThunk(userId, recipeId, title, image);
        Toast.show({
          text: `${title} has been added successfully to your Wish List!`,
          buttonText: 'Okay',
          duration: 3000,
          type: 'success'
        })
      }
    }
    catch(error){
      console.log('Error! ', error);
    }
  };

  removeFromWishList = (userId, recipeId, title) => {
    this.props.removeFromWishListThunk(userId, recipeId);
    Toast.show({
      text: `${title} has been removed successfully from your Wish List.`,
      buttonText: 'Okay',
      duration: 3000,
      type: 'danger'
    })
  }

  formatIngredientName = (ingredient) => {
    let formatted = ingredient[0].toUpperCase() + ingredient.slice(1);
    return formatted;
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
        <Text style={styles.recipeNameTitle}>{this.formatIngredientName(recipe.title)}</Text>
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
                <View style={{flexDirection: "row"}}> 
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>{index + 1}. {this.formatIngredientName(item.name)}</Text>
                </View>
                <View>
                  <Text style={{textDecorationLine: 'underline', fontSize: 14, marginLeft: 15}}>More Information:</Text>
                  <Text style={styles.recipeIngredientName}>{item.originalString}</Text>
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
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item, index }) => {
            return (
                <View style={styles.container}>
                  <View style={{flexDirection: "row"}}> 
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{index + 1}. {this.formatIngredientName(item.name)}</Text>
                  </View>
                  <View>
                    <Text style={{textDecorationLine: 'underline', fontSize: 14, marginLeft: 15}}>More Information:</Text>
                    <Text style={styles.recipeIngredientName}>{item.originalString}</Text>
                  </View>
                </View> 
            );
          }}
        />
  
       {currentUser === undefined || !currentUser.id ? null :  
            <View>
                {wishList === undefined || Object.entries(wishList).length <= 0 ?

                  <Button
                    rounded success
                    style={styles.button}
                    onPress={() => this.addToWishList(currentUser.id,recipe.id, recipe.title, recipe.image)}
                  >
                    <Text style={styles.buttonText}>Add to Wish List</Text>
                  </Button>
                :
                  <Button
                    rounded danger
                    style={styles.button}
                    onPress={() => this.removeFromWishList(currentUser.id,recipe.id, recipe.title)}
                  >
                      <Text style={styles.buttonText}>Remove from Wish List</Text>
                  </Button>
                }
           </View>
       }

        <Button
          rounded dark
          style={styles.button}
          onPress={() =>
            this.searchInstructionAndAddiInfoData(
              currentUser.id,
              recipe.id,
              isLoggedIn
            )
          }
        >
          <Text style={styles.buttonText}>Instruction Details</Text>
        </Button>
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
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10
  },
  displayList: {
    marginTop: 5,
    marginLeft: 10,
  },
  imageStyle: {
    height: 200,
    width: 320,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 15,
  },
  recipeNameTitle: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 20,
    textAlign: "center",

  },
  recipeIngredientName: {
    fontSize: 14,
    marginLeft: 20
  },
  button: {
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
    color: '#F2C04C',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleRecipeScreen);
