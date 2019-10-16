import { StyleSheet } from 'react-native';

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

  export default styles;