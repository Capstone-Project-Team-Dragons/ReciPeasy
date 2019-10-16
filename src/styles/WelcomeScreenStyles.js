import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    welcomeHeader: {
      height: 90,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 60,
      marginBottom: 20,
      alignItems: 'center',
      borderRadius: 5,
    },
    welcomeHeaderText: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#F2C04C',
    },
    slogan: {
      paddingTop: 15,
      paddingBottom: 15,
      fontSize: 16,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#F2C04C',
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
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    searchButton: {
      marginTop: 20,
      width: 330,
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
      fontWeight: '600'
    },
    searchButtonText: {
      fontSize: 18,
      color: '#dfa110',
      fontWeight: 'bold',
    },
    logoutButtonText: {
      fontSize: 18,
      color: '#dfa110',
    },
  });

  export default styles;