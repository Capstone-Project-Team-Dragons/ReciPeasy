import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import db from '../api/db/database';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       email: '', 
       password: '', 
       errorMessage: null 
    };
  }

  handleLogin = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          this.props.navigation.navigate('MyRecipes', { userId: res.user.uid });
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
          this.props.navigation.navigate('MyRecipes', { userId: res.user.uid });
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
