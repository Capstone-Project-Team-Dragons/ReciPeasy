import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, Button } from 'native-base';
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
          this.props.updateCurrentUser(
            res.user.uid,
            res.user.email,
            'loggedIn'
          );
          this.props.navigation.navigate('Welcome');
        }).
        catch((err) => {
          const errmsg = err.message;
          alert(errmsg)
          this.setState({errorMessage: errmsg});
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
        }).
        catch((err) => {
          const errmsg = err.message;
          alert(errmsg)
          this.setState({errorMessage: errmsg});
        });
    } catch (error) {
      alert(error.toString(error));
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <ImageBackground source={require('../screens/ingredientsBackground.jpg')} style={styles.imageStyle}>
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

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 400,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  loginHeader: {
    paddingTop: 70,
    fontWeight: 'bold',
    color: '#F2C04C',
    fontSize: 18,
    textAlignVertical: "center",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: 'white',
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    fontWeight: 'bold'
  },
  button: {
    width: 125,
    color: '#F7E9D0',
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2C04C'
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
