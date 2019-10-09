import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { FIREBASE_API } from 'react-native-dotenv';

var config = {
  apiKey: `${FIREBASE_API}`,
  authDomain: 'ingredia-dc183.firebaseapp.com',
  databaseURL: 'https://ingredia-dc183.firebaseapp.com',
  projectId: 'ingredia-dc183',
  storageBucket: 'ingredia-dc183.appspot.com',
  messagingSenderId: '1083112709962',
};

firebase.initializeApp(config);

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null };
  
  handleLogin = () => {
    // TODO: Firebase stuff...
    // console.log('handleLogin')
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log(res.user.email);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  handleSignUp = () => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => { 
          console.log(user);
          this.props.navigation.navigate('MyRecipes', {userInfo: user})
        });
    } catch(error) {
      console.log('Error ', error)
    }

}

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
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
