import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  getCurrentUser,
  getPastRecipesFromStore,
  getPastRecipesThunk,
  getWishListFromStore,
  getWishListThunk,
} from '../store/actionCreators';
import RecipeList from '../components/RecipeList';

class MyRecipesScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.getCurrentUser();
    const { currentUser } = this.props;
    // retrieve past recipes and wishlist from databse
    this.props.getPastRecipesThunk(currentUser.id);
    this.props.getWishListThunk(currentUser.id);
    const { pastRecipes, wishList } = this.props;

    if (
      JSON.stringify(pastRecipes) !== JSON.stringify({}) &&
      JSON.stringify(wishList) !== JSON.stringify({})
    ) {
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.pastRecipes !== prevProps.pastRecipes ||
      this.props.wishList !== prevProps.wishList
    ) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    this.props.getCurrentUser();
    this.props.getPastRecipesFromStore();
    this.props.getWishListFromStore();
    const { currentUser, pastRecipes, wishList } = this.props;

    let isLoggedIn;
    let doMyRecipesExist;
    let doPastRecipesExists;
    let doWishListExists;
    let isLoading = false;

    if (currentUser !== undefined && currentUser.id) {
      // if current user is logged in,
      isLoggedIn = true;

      //if either pastRecipes or wishlist, not empty,
      if (
        JSON.stringify(pastRecipes) === JSON.stringify({}) &&
        JSON.stringify(wishList) === JSON.stringify({})
      ) {
        isLoading === true;
        // if still empty, retrieve past recipes and wishlist from databse
        this.props.getPastRecipesThunk(currentUser.id);
        this.props.getWishListThunk(currentUser.id);
      }
      // check if it has more than 'recipe0'
      if (Object.keys(pastRecipes).length > 1) {
        doPastRecipesExists = true;
      } else {
        doPastRecipesExists = false;
      }

      // check if it has more than 'recipe0'
      if (Object.keys(wishList).length > 1) {
        doWishListExists = true;
      } else {
        doWishListExists = false;
      }

      // My Recipes exist, if at least one exists
      if (doPastRecipesExists === true || doWishListExists === true) {
        doMyRecipesExist = true;
      } else {
        doMyRecipesExist = false;
      }
    } else {
      isLoggedIn = false;
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
        ) : isLoading === true ? (
          <View>
            <Text style={styles.messageLine2}>Loading...</Text>
          </View>
        ) : doMyRecipesExist === false ? (
          <View>
            <Text style={styles.messageLine1}>No Recipes to Show!</Text>
            <Text style={styles.messageLine2}>Please Add Recipes</Text>
          </View>
        ) : doPastRecipesExists === true && doWishListExists === true ? (
          <View>
            <Text style={styles.listTitle}>Your Past Recipes</Text>
            <ScrollView>
              <RecipeList allRecipes={Object.values(pastRecipes)} />
            </ScrollView>

            <Text style={styles.listTitle}>Your Wish List</Text>
            <ScrollView>
              <RecipeList allRecipes={Object.values(wishList)} />
            </ScrollView>
          </View>
        ) : doPastRecipesExists === true ? (
          <View>
            <Text style={styles.listTitle}>Your Past Recipes</Text>
            <ScrollView>
              <RecipeList allRecipes={Object.values(pastRecipes)} />
            </ScrollView>
          </View>
        ) : doWishListExists === true ? (
          <View>
            <Text style={styles.listTitle}>Your Wish List</Text>
            <ScrollView>
              <RecipeList allRecipes={Object.values(wishList)} />
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
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#52809a',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRecipesScreen);
