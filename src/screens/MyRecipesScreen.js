import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

class MyRecipesScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}> 
          <TouchableOpacity
            horizontal={true}
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Login or Sign-Up</Text>
          </TouchableOpacity>
        </View>    
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
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
  }
})

export default withNavigation(MyRecipesScreen);