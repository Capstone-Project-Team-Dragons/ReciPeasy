import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  getCurrentUser,
  getPastRecipesFromStore,
  getPastRecipesThunk,
  getWishListFromStore,
  getWishListThunk,
} from '../store/actionCreators';

class MyRecipesScreen extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { currentUser } = this.props;
    let isLoggedIn = false;
    let doMyRecipesExist = false;
    let doPastRecipesExists = false;
    let doWishListExists = false;

    // retrieve past recipes and wishlist from store
    this.props.getPastRecipesFromStore();
    this.props.getWishListFromStore();
    const { pastRecipes, wishList } = this.props;

    if (currentUser !== undefined && currentUser.id) {
      isLoggedIn = true;

      // if current user is logged in, check if past recipe list exists in store
      if (pastRecipes !== undefined) {
        // check if it is an empty object
        if (JSON.stringify(pastRecipes) !== JSON.stringify({})) {
          doPastRecipesExists = true;
        }
      }
      // if does not exist, retrieve it from database
      else {
        this.props.getPastRecipesThunk(currentUser.id);
      }

      // if current user is logged in, check if wishlist exists in store
      if (wishList !== undefined) {
        // check if it is an empty object
        if (JSON.stringify(wishList) !== JSON.stringify({})) {
          doWishListExists = true;
        }
      }
      // if does not exist, retrieve it from database
      else {
        this.props.getWishListThunk(currentUser.id);
      }

      // my recipes exist, if at least one exists
      if (doPastRecipesExists === true || doWishListExists === true) {
        doMyRecipesExist = true;
      }
    }

    return (
      <View style={styles.container}>
        {isLoggedIn === false ? (
          <View>
            <Text style={styles.messageLine1}>To View your Recipes,</Text>
            <Text style={styles.messageLine2}>please Login or Sign-Up</Text>

            <TouchableOpacity
              horizontal={true}
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login or Sign-Up</Text>
            </TouchableOpacity>
          </View>
        ) : doMyRecipesExist === false ? (
          <View>
            <Text style={styles.messageLine1}>No Recipes to Show!</Text>
            <Text style={styles.messageLine2}>Please Add Recipes</Text>
          </View>
        ) : (
          <Text style={styles.listTitle}>Your Recipes</Text>
        )}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  messageLine1: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  messageLine2: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
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
  loginButtonText: {
    fontSize: 18,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRecipesScreen);
