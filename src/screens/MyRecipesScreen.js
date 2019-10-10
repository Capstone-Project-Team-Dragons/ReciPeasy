import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import db from '../api/db/database';

class MyRecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: null };
  }

  componentDidUpdate(prevProps, prevState) {
    const id = this.props.navigation.getParam('userId');
    if (id !== prevState.userId) {
      this.setState({ userId: id });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.userId === undefined || this.state.userId === null ? (
          <TouchableOpacity
            horizontal={true}
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Login or Sign-Up</Text>
          </TouchableOpacity>
        ) : (
          <Text>User Info</Text>
        )}
      </View>
    );
  }
}

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

export default withNavigation(MyRecipesScreen);
