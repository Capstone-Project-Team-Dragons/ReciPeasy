import React from 'react';
import {
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import styles from '../styles/WelcomeScreenStyles'
import { updateCurrentUser, getCurrentUser } from '../store/usersReducer';
import { clearPastRecipesFromStore } from '../store/pastRecipesReducer';
import { clearWishListFromStore } from '../store/wishListReducer';


class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentUser();
  }
  componentDidUpdate() {
    this.props.getCurrentUser();
  }

  handleLogout() {
    this.props.updateCurrentUser(
      this.props.currentUser.id,
      this.props.currentUser.email,
      'loggedOut'
    );
    this.props.clearPastRecipesFromStore();
    this.props.clearWishListFromStore();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <ImageBackground
        source={require('../screens/ingredientsBackground.jpg')}
        style={styles.imageStyle}
      >
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeHeaderText}>ingredia</Text>
          <Text style={styles.slogan}>
            give us your list of ingredients, and we'll give you some delicious
            recipes to whip up!
          </Text>

          {currentUser === undefined || !currentUser.id ? (
            <View>
              <Button
                rounded
                dark
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Login or Sign Up</Text>
              </Button>

              <Button
                rounded
                dark
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Search')}
              >
                <Text style={styles.buttonText}>Continue as a Guest</Text>
              </Button>
            </View>
          ) : (
            <View>
              <Text style={styles.welcomeMessage}>
                Welcome {currentUser.email}!
              </Text>
              <Button
                rounded
                light
                style={styles.searchButton}
                onPress={() => this.props.navigation.navigate('Search')}
              >
                <Text style={styles.searchButtonText}>
                  Click here to start adding ingredients
                </Text>
              </Button>

              <Button
                rounded
                light
                style={styles.logOutButton}
                onPress={this.handleLogout}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </Button>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.usersReducer.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
    updateCurrentUser: (userId, userEmail, status) =>
      dispatch(updateCurrentUser(userId, userEmail, status)),
    clearPastRecipesFromStore: () => dispatch(clearPastRecipesFromStore()),
    clearWishListFromStore: () => dispatch(clearWishListFromStore()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen);
