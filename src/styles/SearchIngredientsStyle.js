import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      fontSize: 18,
      marginLeft: 15,
      fontWeight: 'bold',
    },
    displayList: {
      marginTop: 5,
      marginLeft: 15,
      minHeight: 50,
    },
    displayItem: {
      fontSize: 18,
    },
    ingredientItemContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    removeIngredientButton: {
      backgroundColor: '#e0e0e0',
      marginHorizontal: 10,
      justifyContent: 'center',
    },
    removeIngredientButtonText: {
      color: 'black',
    },
    searchRecipeButton: {
      height: 40,
      borderRadius: 5,
      marginHorizontal: 35,
      marginTop: 10,
      flexDirection: 'row',
      marginBottom: 10,
      marginLeft: 15,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
    clearSearchResultsButton: {
      marginTop: 10,
      borderRadius: 5,
      flexDirection: 'row',
      marginBottom: 10,
      height: 40,
      width: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearSearchResultsButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F2C04C',
      textAlign: 'center',
    },
    addButton: {
      marginTop: 15,
      width: 60,
      color: '#F7E9D0',
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    barcodeButton: {
      width: 200,
      marginBottom: 5,
      marginLeft: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchButtonText: {
      color: '#F2C04C',
      fontSize: 16,
      fontWeight: 'bold'
    },  
    barcodeText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#F2C04C',
    }
  });

  export default styles;