import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateCurrentUser, getCurrentUser } from '../store/actionCreators';


class WelcomeScreen extends React.Component {
    componentDidMount() {
        this.props.getCurrentUser();
    }

    render() {
        const { currentUserId } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.welcomeHeader}>
                    <Text style={styles.welcomeHeaderText}> 
                        Welcome to the Ingredia
                    </Text>
                </View>

                {currentUserId === undefined || currentUserId === '' ? (
                    <View>
                        <TouchableOpacity
                            horizontal={true}
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>Login or Sign-Up</Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity
                            horizontal={true}
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Search')}
                        >
                            <Text style={styles.buttonText}>Continue as Guest</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            horizontal={true}
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Search')}
                        >
                            <Text style={styles.buttonText}>Click here to start adding ingredients to your list!</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            horizontal={true}
                            style={styles.button}
                            onPress={() => this.props.updateCurrentUser(currentUserId, 'loggedOut')}
                        >
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
                <View style={styles.imageContainer} >
                    <Image style={styles.imageStyle} source={require("../screens/Pic1.jpg")} />
                </View>
            </View>
          
        )
    }
}

const mapStateToProps = state => {
    return {
      currentUserId: state.usersReducer.currentUserId
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getCurrentUser: () => dispatch(getCurrentUser()),
      updateCurrentUser: (userId, status) =>
        dispatch(updateCurrentUser(userId, status)),
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }, 
    welcomeHeader: {
        height: '20%', 
        backgroundColor: 'powderblue', 
        padding: 30, 
        paddingLeft: 40
    },
    welcomeHeaderText: {
        fontFamily: 'Cochin-BoldItalic', 
        fontSize: 28, 
        color: 'darkblue'
    },
    imageContainer: {
        height: '80%'
    }, 
    imageStyle: {
        height: '100%', 
        width : '100%'
    },
    button: {
        backgroundColor: 'white',
        height: 40,
        borderRadius: 5,
        marginHorizontal: 50,
        marginTop: 10,
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }
})



export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WelcomeScreen);