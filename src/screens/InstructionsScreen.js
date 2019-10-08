import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native';
import InstructionList from '../components/InstructionList';

const InstructionScreen = ({ navigation}) => {
    const instructions = navigation.getParam('instructions');
    return (
        <View style={styles.container}>
            <Text  style={styles.textTitle}>Instruction Details</Text>
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
    }
});

export default InstructionScreen;