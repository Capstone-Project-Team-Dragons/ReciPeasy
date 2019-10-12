import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import spoonacular from '../api/spoonacular';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { SPOON_API } from 'react-native-dotenv';
import RecipeList from '../components/RecipeList';

// Recipes Data for testing purpose, saved in json format inside the data.js file.
// import data from '../testData/recipeData';

const SearchIngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [currIngredient, setCurrIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  // Search Spoonacular API to retrieve the "Recipes List" (Array).
  const searchRecipesApi = async ingreds => {
    // If "Ingredients List" has some ingredients,
    if (ingreds.length > 0) {
      try {
        const { data } = await spoonacular.get(
          `/findByIngredients?apiKey=${SPOON_API}`,
          {
            params: {
              ingredients: ingreds.join(),
              number: 15,
              ranking: 2,
              ignorePantry: true,
            },
          }
        );
        setRecipes(data);
      } catch (error) {
        console.log('Error! ', error);
      }
    }
    // Else, if "Ingredients List" is empty, make "Recipes List" empty too.
    else {
      setRecipes([]);
    }
  };

  // A handler when an ingredient is submitted by user, either manually or by scanning barcode.
  const submitHandler = cIngredient => {
    let currItem = cIngredient.trim().toLowerCase();
    if (currItem.length > 0) {
      if (ingredients.includes(currItem)) {
        setCurrIngredient('');
      } else {
        setIngredients([...ingredients, currItem]);
        setCurrIngredient('');
      }
    }
  };

  // If user scanned barcode of a product, add the product name to "Ingredients List" (Array).
  let dataFromBarcode = navigation.getParam('ingredientName');

  if (dataFromBarcode !== null) {
    if (
      dataFromBarcode &&
      !ingredients.includes(dataFromBarcode.toLowerCase())
    ) {
      submitHandler(dataFromBarcode);
    }
  }

  // A handler when user wants to remove an ingredient from the "Ingredients List" (Array).
  const removeIngredient = cIngredient => {
    const indexOfItem = ingredients.indexOf(cIngredient);
    setIngredients(ingredients.filter((item, index) => index !== indexOfItem));
    navigation.setParams({ ingredientName: null });
  };

  // A handler when user wants to "Clear Search Results".
  const clearSearchResults = () => {
    // Make Recipes List" empty.
    setRecipes([]);
  };

  //Call searchRecipesApi when component is first rendered
  //useEffect hook that passes a function that we want to run only once,
  //or depending on if the values in the array change
  useEffect(() => {
    searchRecipesApi([]);
  }, []);

  return (
    <View>
      <SearchBar
        currIngredient={currIngredient}
        onTermChange={newIngred => setCurrIngredient(newIngred)}
        onTermSubmit={() => submitHandler(currIngredient)}
      />

      <Text style={styles.header}>Your List of Ingredients: </Text>
      <FlatList
        data={ingredients}
        style={styles.displayList}
        keyExtractor={ingredient => ingredient}
        renderItem={({ item }) => {
          return (
            <View style={styles.ingredientItemContainer}>
              <Text style={styles.displayItem}>{item}</Text>

              <TouchableOpacity
                horizontal={true}
                style={styles.removeIngredientButton}
                onPress={() => removeIngredient(item)}
              >
                <Text style={styles.removeIngredientButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        horizontal={true}
        style={styles.searchRecipeButton}
        onPress={() => searchRecipesApi(ingredients)}
      >
        <Text style={styles.buttonText}>Find Recipes</Text>
      </TouchableOpacity>
      {recipes.length > 0 ? (
        <View>
          <TouchableOpacity
            horizontal={true}
            style={styles.clearSearchResultsButton}
            onPress={() => clearSearchResults()}
          >
            <Text style={styles.clearSearchResultsButtonText}>
              Clear Search Results
            </Text>
          </TouchableOpacity>
          <ScrollView>
            <RecipeList allRecipes={recipes} />
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  displayList: {
    marginTop: 5,
    marginLeft: 15,
    minHeight: 100,
  },
  displayItem: {
    fontSize: 16,
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  clearSearchResultsButton: {
    backgroundColor: '#ff8989',
    marginHorizontal: 50,
    marginTop: 10,
    marginBottom: 10,
    height: 25,
    justifyContent: 'center',
  },
  clearSearchResultsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
});

export default SearchIngredientsScreen;
