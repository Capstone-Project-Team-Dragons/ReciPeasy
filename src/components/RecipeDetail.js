import React from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    Image, 
    TouchableOpacity 
} from 'react-native';

const RecipeDetail = ({ recipe }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.recipeName}>{recipe.title}</Text>
            <Image style={styles.imageStyle} source={{ uri: recipe.image }} />
        </View>
    )

}

const styles = StyleSheet.create({
    //by default an image wants to collapse itself
    container: {
        marginLeft: 15
    },
    recipeName: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center'
    },
    imageStyle: {
        height: 120,
        width: 250,
        borderRadius: 5,
        marginLeft: 45
    }
});


export default RecipeDetail;