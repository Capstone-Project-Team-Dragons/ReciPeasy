import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native';
import InstructionList from '../components/InstructionList';

const InstructionScreen = ({ navigation}) => {
    const instructions = navigation.getParam('instructions');
    const addtionalInfo = navigation.getParam('addtionalInfo');
    return (
        <View style={styles.container}>
            <Text  style={styles.textTitle}>Instruction Details</Text>
            <View style={styles.addtional}>
                 <Text style={styles.textAddtional}>Ready In Minutes: { addtionalInfo["readyInMinutes"]}</Text>
                 <Text style={styles.textAddtional}>Health Score: {addtionalInfo["healthScore"]}</Text>
                 <Text style={styles.textAddtional}>Servings: {addtionalInfo["servings"]}</Text>
            </View>
            <FlatList
                    data={instructions}
                    keyExtractor={(item, index) => 'key2'+index}
                    renderItem={({ item, index }) => {
                          return ( <InstructionList allInstructions={item} /> );
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 5
    },
    addtional: {
        marginLeft: 20,
        marginRight: 20,
        fontWeight: "bold",
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 1,
        padding: 5
    },
    textAddtional: {
        fontSize: 12,
        fontWeight: "bold"
    }
});

export default InstructionScreen;