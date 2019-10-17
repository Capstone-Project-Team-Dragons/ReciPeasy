import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //by default an image wants to collapse itself
    container: {
      marginLeft: 15,
    },
    recipeName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 5,
      textDecorationLine: 'underline'
    },
    displayList: {
      marginTop: 5,
      marginLeft: 10,
    },
    imageStyle: {
      height: 200,
      width: 320,
      borderRadius: 5,
      marginTop: 10,
      marginLeft: 15,
      marginBottom: 15,
    },
    recipeNameTitle: {
      fontWeight: 'bold',
      margin: 10,
      fontSize: 20,
      textAlign: 'center',
    },
    recipeIngredientName: {
      fontSize: 16,
      marginLeft: 15,
    },
    remainingIngredient: {
      fontSize: 16,
      marginLeft: 10
    },
    button: {
      height: 30,
      borderRadius: 5,
      marginHorizontal: 100,
      marginTop: 10,
      flexDirection: 'row',
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#F2C04C',
    },
  });
  

export default styles;