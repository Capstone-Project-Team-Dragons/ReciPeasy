import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getCurrentUser } from '../store/actionCreators';
import { getPastRecipesThunk } from '../store/actionCreators';
import { getWishListThunk } from '../store/actionCreators';

class MyRecipesScreen extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { currentUser } = this.props;
    let isLoggedIn = false;
    if (currentUser !== undefined && currentUser.id) {
      isLoggedIn = true;
      this.props.getPastRecipesThunk(currentUser.id);
    }
    const { pastRecipes } = this.props;

    return (
      <View style={styles.container}>
        {currentUser === undefined || !currentUser.id ? (
          <View>
            <Text>To View your Recipes, please Login or Sign-Up</Text>
            <TouchableOpacity
              horizontal={true}
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text>Login or Sign-Up</Text>
            </TouchableOpacity>
          </View>
        ) : pastRecipes === undefined ? (
          <Text>No Recipes to Show! Please Add Recipes</Text>
        ) : (
          <Text>Your Recipes</Text>
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
    getPastRecipesThunk: userId => dispatch(getPastRecipesThunk(userId)),
    getWishListThunk: userId => dispatch(getWishListThunk(userId)),
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyRecipesScreen);
