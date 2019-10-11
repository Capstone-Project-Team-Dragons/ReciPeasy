import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import db from '../api/db/database';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../store/actionCreators';

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
          this.props.updateCurrentUser(res.user.uid, 'loggedIn');
          this.props.navigation.navigate('MyRecipes');
        });
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(error.toString(error));
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
          this.props.updateCurrentUser(res.user.uid, 'loggedIn');
          this.props.navigation.navigate('MyRecipes');
        });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: 'blue' }}>{this.state.errorMessage}</Text>
        )}
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
        <Button title="Login" onPress={this.handleLogin} />
        <Button title="Sign-Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { currentUserId: state.currentUserId };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentUser: (userId, status) =>
      dispatch(updateCurrentUser(userId, status)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
