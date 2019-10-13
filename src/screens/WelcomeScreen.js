import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Button } from 'native-base';
import { updateCurrentUser, getCurrentUser } from '../store/actionCreators';

class WelcomeScreen extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <ImageBackground source={require('../screens/ingredientsBackground.jpg')} style={styles.imageStyle}>
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeHeaderText}>ingredia</Text>
          <Text style={styles.slogan}>give us your list of ingredients, and we'll give you some delicious recipes to whip up!</Text>
          
          {currentUser === undefined || !currentUser.id ? 
            (
              <View>
                <Button
                  rounded dark
                  style={styles.button} 
                  onPress={() => this.props.navigation.navigate('Login')} 
                > 
                  <Text style={styles.buttonText}>Login or Sign Up</Text>
                </Button>

                <Button
                  rounded dark
                  style={styles.button} 
                  onPress={() => this.props.navigation.navigate('Search')} 
                > 
                  <Text style={styles.buttonText}>Continue as a Guest</Text>
                </Button>
              </View>
            ) : (
              <View>
                  <Text style={styles.welcomeMessage}>Welcome {currentUser.email}!</Text>
                  <Button
                    rounded light
                    style={styles.searchButton} 
                    onPress={() => this.props.navigation.navigate('Search')} 
                  > 
                    <Text style={styles.buttonText}>Click here to start adding ingredients</Text>
                  </Button>

                  <Button
                    rounded light
                    style={styles.logOutButton} 
                    onPress={() => this.props.updateCurrentUser(currentUser.id, currentUser.email, 'loggedOut')} 
                  > 
                    <Text style={styles.buttonText}>Log Out</Text>
                  </Button>
              </View>            
            )
          }
        </View>
      </ImageBackground>
    )
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
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  welcomeHeader: {
    height: 90,
    // width: 300,
    // backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 60,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
    // padding: 30,
    //paddingTop: 30,
    // paddingLeft: 40,
  },
  welcomeHeaderText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F2C04C'
  },
  slogan: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 16,
    textAlignVertical: "center",
    textAlign: "center",
    fontStyle: 'italic',
    color: '#F2C04C'
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: 175,
    color: '#F7E9D0',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    paddingTop: 15,
    color: '#F7E9D0',
    fontSize: 25,
    textAlignVertical: "center",
    textAlign: "center",
  },
  searchButton: {
    marginTop: 20,
    width: 300,
    color: '#F7E9D0',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  logOutButton: {
    marginLeft: 80,
    marginTop: 5,
    width: 150,
    color: '#F7E9D0',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#F2C04C',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeScreen);
