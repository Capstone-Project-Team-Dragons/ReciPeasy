import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking} from 'react-native';

const SingleRecipeScreen = ({ navigation}) => {
    const recipe = navigation.getParam('recipe');

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
        fontWeight: "bold"
    },
    imageStyle: {
        height: 120,
        width: 250,
        borderRadius: 5
    }
});

export default SingleRecipeScreen;
