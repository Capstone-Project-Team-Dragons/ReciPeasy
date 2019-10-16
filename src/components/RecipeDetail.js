import React from 'react';
import {
    View, 
    Text, 
    Image, 
} from 'react-native';
import styles from '../styles/RecipeDetailStyle'

const RecipeDetail = ({ recipe }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.recipeName}>{recipe.title}</Text>
            <Image style={styles.imageStyle} source={{ uri: recipe.image }} />
        </View>
    )

}

export default RecipeDetail;