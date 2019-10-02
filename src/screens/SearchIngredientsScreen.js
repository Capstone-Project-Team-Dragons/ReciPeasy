import React, { useState, useEffect } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    FlatList
} from 'react-native';
import SearchBar from '../components/SearchBar';
import spoonacular from '../api/spoonacular'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'; 
import { SPOON_API } from 'react-native-dotenv';
import RecipeList from '../components/RecipeList';

const SearchIngredientsScreen = () => {
    const [ingredients, setIngredients] = useState([]);
    const [currIngredient, setCurrIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);

    const submitHandler = ()=> {
        setIngredients([...ingredients, currIngredient]);
        setCurrIngredient('');
    }

    const searchRecipesApi = async () => {
        console.log('API: ', SPOON_API)
        try {
            const {data} = await spoonacular.get(`/findByIngredients?apiKey=${SPOON_API}`, {
                params: {
                    ingredients: ingredients.join(),
                    number: 15,
                    ranking: 2,
                    ignorePantry: true
                }
            });
            setRecipes(data);
        } catch (error) {
            console.log('Error! ', error)
        }
    }

    //Call searchYelpApi when component is first rendered
    //useEffect hook that passes a function that we want to run only once, 
    //or depending on if the values in the array change
    useEffect(() => {
        searchRecipesApi(['apples', 'flour', 'sugar']);
    }, []);

    return (
        <View>
            <SearchBar 
                currIngredient={currIngredient}
                onTermChange ={(newIngred) => setCurrIngredient(newIngred) }
                onTermSubmit= {() => submitHandler()}
            />
            <Text style={styles.header}>Your List of Ingredients: </Text>
            <FlatList 
                data={ingredients}
                style={styles.displayList}
                keyExtractor={(ingredient) => ingredient}
                renderItem={({ item, index }) => {
                    return (
                        <Text key={index}>{item} - {index}</Text>
                    )
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
                <RecipeList allRecipes={recipes}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        marginLeft: 15,
        fontWeight: "bold"
    },
    displayList: {
        marginTop: 5,
        marginLeft: 15
    },
    displayItem: {
        fontSize: 16
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
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})

export default SearchIngredientsScreen;