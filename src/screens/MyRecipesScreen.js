import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'native-base';
import { connect } from 'react-redux';

import styles from '../styles/MyRecipeScreenStyle';

import { getCurrentUser } from '../store/usersReducer';
import {
  getPastRecipesFromStore,
  getPastRecipesThunk,
} from '../store/pastRecipesReducer';
import {
  getWishListFromStore,
  getWishListThunk,
} from '../store/wishListReducer';

import UserPastRecipesList from '../components/UserPastRecipesList';
import UserWishList from '../components/UserWishList';


class MyRecipesScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.displayLogicHandler = this.displayLogicHandler.bind(this);
  }

  displayLogicHandler() {
    let isLoggedIn;
    let isLoading;
    let doMyRecipesExist;
    let doPastRecipesExists;
    let doWishListExists;

    // Retrieve current user, past recipes and wish list from Redux store
    this.props.getCurrentUser();
    this.props.getPastRecipesFromStore();
    this.props.getWishListFromStore();

    const { currentUser, pastRecipes, wishList } = this.props;

    // Check if current user is logged in,
    if (currentUser !== undefined && currentUser.id) {
      isLoggedIn = true;

      //If both, pastRecipes and wishlist, are empty,
      if (
        JSON.stringify(pastRecipes) === JSON.stringify([]) &&
        JSON.stringify(wishList) === JSON.stringify([])
      ) {
        // That means the data is still loading
        isLoading === true;
        // And because they are empty, try to retrieve both lists,
        // past recipes and wishlist, from the databse
        this.props.getPastRecipesThunk(currentUser.id);
        this.props.getWishListThunk(currentUser.id);
      }
      // Else if both lists are not empty, then data is loaded.
      else {
        isLoading = false;
      }

      // For past recipes, check if data has more than just 'recipe0' doc
      if (pastRecipes.length > 1) {
        doPastRecipesExists = true;
      } else {
        doPastRecipesExists = false;
      }

      // For wish list, check if data has more than just 'recipe0' doc
      if (wishList.length > 1) {
        doWishListExists = true;
      } else {
        doWishListExists = false;
      }

      // My Recipes exist, if at least one of the two lists exists
      if (doPastRecipesExists === true || doWishListExists === true) {
        doMyRecipesExist = true;
      } else {
        doMyRecipesExist = false;
      }
    }
    // Else, current user is not logged in
    else {
      isLoggedIn = false;
    }

    return {
      isLoggedIn,
      isLoading,
      doMyRecipesExist,
      doPastRecipesExists,
      doWishListExists,
    };
  }

  render() {
    const { pastRecipes, wishList } = this.props;

    const displayFlags = this.displayLogicHandler();

    return (
      <View style={styles.container}>
        {displayFlags.isLoggedIn === false ? (
          <View>
            <Text style={styles.messageLine1}>To Access the My Recipes Feature:</Text>
            <Text style={styles.messageLine2}>Please Login or Sign-Up!</Text>

            <Button
              rounded dark
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login or Sign-Up</Text>
            </Button>
          </View>
        
        ) : displayFlags.isLoading === true ? (
          <View>
            <Text style={styles.messageLine2}>Loading...</Text>
          </View>
        
        ) : displayFlags.doMyRecipesExist === false ? (
          <View>
            <Text style={styles.messageLine1}>No Recipes to Show!</Text>
            <Text style={styles.messageLine2}>Please Add Recipes</Text>
          </View>
        
        ) : displayFlags.doPastRecipesExists === true &&
          displayFlags.doWishListExists === true ? (
          <View>
            <Text style={styles.listTitle}>Your Past Recipes</Text>
            <ScrollView>
              <UserPastRecipesList allRecipes={pastRecipes} />
            </ScrollView>

            <Text style={styles.listTitle}>Your Wish List</Text>
            <ScrollView>
              <UserWishList allRecipes={wishList} />
            </ScrollView>
          </View>
        
        ) : displayFlags.doPastRecipesExists === true ? (
          <View>
            <Text>No Wish List!</Text>
            <Text style={styles.listTitle}>Your Past Recipes</Text>
            <ScrollView>
              <UserPastRecipesList allRecipes={pastRecipes} />
            </ScrollView>
          </View>
        
        ) : displayFlags.doWishListExists === true ? (
          <View>
            <Text>No Past Recipes!</Text>
            <Text style={styles.listTitle}>Your Wish List</Text>
            <ScrollView>
              <UserWishList allRecipes={wishList} />
            </ScrollView>
          </View>

        ) : null}
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
    getPastRecipesFromStore: () => dispatch(getPastRecipesFromStore()),
    getPastRecipesThunk: userId => dispatch(getPastRecipesThunk(userId)),
    getWishListFromStore: () => dispatch(getWishListFromStore()),
    getWishListThunk: userId => dispatch(getWishListThunk(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRecipesScreen);
