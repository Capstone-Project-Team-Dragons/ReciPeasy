import React from 'react';
import {View, Text, FlatList } from 'react-native';
import styles from '../styles/InstructionListStyle';

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

export default InstructionList;

