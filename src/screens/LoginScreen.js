import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import styles from '../styles/LoginScreenStyles'
import { Button } from 'native-base';

import db from '../api/db/database';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../store/usersReducer';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleLogin = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          this.props.updateCurrentUser(
            res.user.uid,
            res.user.email,
            'loggedIn'
          );
          this.props.navigation.navigate('Welcome');
        })
        .catch(err => {
          const errmsg = err.message;
          alert(errmsg);
          this.setState({ errorMessage: errmsg });
        });
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  handleSignUp = () => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          db.collection('users')
            .doc(`${res.user.uid}`)
            .set({ email: `${res.user.email}` });

          db.collection('users')
            .doc(`${res.user.uid}`)
            .collection('pastRecipes')
            .doc('recipe0')
            .set({ recipeId: 0 });

          db.collection('users')
            .doc(`${res.user.uid}`)
            .collection('wishList')
            .doc('recipe0')
            .set({ recipeId: 0 });

          this.props.updateCurrentUser(
            res.user.uid,
            res.user.email,
            'loggedIn'
          );
          this.props.navigation.navigate('Welcome');
        })
        .catch(err => {
          const errmsg = err.message;
          alert(errmsg);
          this.setState({ errorMessage: errmsg });
        });
    } catch (error) {
      alert(error.toString(error));
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../screens/ingredientsBackground.jpg')}
        style={styles.imageStyle}
      >
        <Text style={styles.loginHeader}>Login or Sign-up with Your Email</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <View style={{flexDirection: 'row'}}>
            <Button
              rounded success
              style={styles.button} 
              onPress={() => this.handleLogin()} 
            > 
              <Text style={styles.buttonText}>Login</Text>
            </Button>

            <Button
              rounded info
              style={styles.button} 
              onPress={() => this.handleSignUp()}
            > 
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return { currentUser: state.usersReducer.currentUser };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentUser: (userId, userEmail, status) =>
      dispatch(updateCurrentUser(userId, userEmail, status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
