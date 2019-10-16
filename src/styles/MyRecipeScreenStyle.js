import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    messageLine1: {
      marginTop: 15,
      fontSize: 22,
      fontWeight: 'bold',
      textAlignVertical: 'center',
      textAlign: 'center',
      textDecorationLine: 'underline'
    },
    messageLine2: {
      marginTop: 15,
      marginBottom: 15,
      fontSize: 20,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    loginButton: {
      height: 40,
      borderRadius: 5,
      marginHorizontal: 50,
      marginTop: 10,
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginButtonText: {
      fontSize: 18,
      color: '#F2C04C',
      fontWeight: 'bold',
    },
    listTitle: {
      marginTop: 15,
      marginBottom: 15,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#52809a',
    },
  });

export default styles;