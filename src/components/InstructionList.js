import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

const InstructionList = ({allInstructions}) => {
    return (
        <View style={styles.container}>
            <FlatList
                    data={allInstructions["steps"]}
                    keyExtractor={(item, index) => 'key3'+index}
                    renderItem={({ item, index }) => {
                          return ( 
                                <Text style={styles.text}>{`Step ${index+1}: `}{item.step}</Text>
                                    
                          );
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    text: {
        fontSize: 14,
        margin: 5
    }
});

export default InstructionList;

