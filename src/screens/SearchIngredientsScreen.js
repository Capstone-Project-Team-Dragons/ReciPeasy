import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import spoonacular from '../api/spoonacular';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { SPOON_API } from 'react-native-dotenv';
import RecipeList from '../components/RecipeList';

// Recipes Data for testing purpose, saved in json format inside the data.js file.
// import data from '../components/data';

const SearchIngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [currIngredient, setCurrIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  // Search Spoonacular API to retrieve the "Recipes List" (Array).
  const searchRecipesApi = async ingreds => {
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
  };

  // A handler when an ingredient is submitted.
  const submitHandler = cIngredient => {
    if (ingredients.includes(cIngredient.toLowerCase())) {
      setCurrIngredient('');
    } else {
      setIngredients([...ingredients, cIngredient.toLowerCase()]);
      setCurrIngredient('');
    }
  };

  // If user scanned barcode of a product, add the product name to "Ingredients List" (Array).
  let dataFromBarcode = navigation.getParam('ingredientName');
  if (dataFromBarcode && !ingredients.includes(dataFromBarcode.toLowerCase())) {
    submitHandler(dataFromBarcode);
    // dataFromBarcode= null;
  }

  //Call searchRecipesApi when component is first rendered
  //useEffect hook that passes a function that we want to run only once,
  //or depending on if the values in the array change

  useEffect(() => {
    searchRecipesApi([]);
    // For testing purposes,
    // searchRecipesApi(['apples', 'flour', 'sugar']);
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
          return <Text>{item}</Text>;
        }}
      />
      <TouchableOpacity
        horizontal={true}
        style={styles.searchRecipeButton}
        onPress={() => searchRecipesApi(ingredients)}
      >
        <Text style={styles.buttonText}>Find Recipes</Text>
      </TouchableOpacity>
      <ScrollView>
        {recipes.length > 0 ? <RecipeList allRecipes={recipes} /> : null}
      </ScrollView>
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
  },
  displayItem: {
    fontSize: 16,
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
});

export default SearchIngredientsScreen;
