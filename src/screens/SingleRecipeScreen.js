import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { SPOON_API } from 'react-native-dotenv';
import spoonacular from '../api/spoonacular';

// Recipes Data for testing purpose, saved in json format inside the data.js file.
// import data from '../testData/instructionData';


const SingleRecipeScreen = ({ navigation}) => {
    const recipe = navigation.getParam('recipe');
    
    // Search Spoonacular API to retrieve the "Instructions" for each recipe (Array).
    const searchInstructionApi = async id => {
      try {
        const x = `/${id}/analyzedInstructions?apiKey=${SPOON_API}`;
        const { data } = await spoonacular.get(x);
        console.log('Data Instructions', data)
        navigation.navigate('Instruction', { instructions: data });
      } catch (error) {
        console.log('Error! ', error);
    }
  };

    return (
        <View style={styles.container}>
            <Text style={styles.recipeNameTitle}>Recipe: {recipe.title}</Text>
            <Image style={styles.imageStyle} source={{ uri: recipe.image }} />
            <Text style={styles.recipeName}>Total Used Ingredient(s): {recipe.usedIngredientCount} </Text>

            <FlatList
                data={recipe.usedIngredients}
                style={styles.displayList}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={({ item }) => {
                                return (<View style={styles.container}>
                                            <Image style={styles.imageIngredientStyle} source={{ uri: item.image }} />
                                            <Text style={styles.recipeIngredientName}>Name: {item.name}</Text>
                                            <Text style={styles.recipeIngredientName}>Quantity Need: {item.original}</Text>
                                        </View>);
                        }} 
            />


            <TouchableOpacity
                    horizontal={true}
                    style={styles.searchRecipeButton}
                    onPress={() => searchInstructionApi(recipe.id)}
                >
                <Text style={styles.buttonText}>Instruction Details</Text>
                
            </TouchableOpacity> 
                
                

        </View>
    )
}

const styles = StyleSheet.create({
    //by default an image wants to collapse itself
    container: {
        marginLeft: 15
    },
    recipeName: {
        fontWeight: "bold"
    },
    displayList: {
        marginTop: 5,
        marginLeft: 15,
    },
    imageStyle: {
        height: 120,
        width: 250,
        borderRadius: 5,
        margin: 5,
        marginBottom: 15
    },
    imageIngredientStyle: {
        height: 80,
        width: 100,
        borderRadius: 5,
        padding: 5
    },
    recipeNameTitle: {
        fontWeight: "bold",
        margin: 5
    },
    recipeIngredientName: {
        fontSize: 12
    },
    searchRecipeButton: {
        backgroundColor: '#66ccff',
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
        color: 'white',
      },
});


export default SingleRecipeScreen;
