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
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>{`Step ${index+1}: `}</Text>
                            <Text style={styles.text}>{item.step}</Text>
                        </View> 
                                    
                    );
                }} 
            />
        </View>
    )
}

export default InstructionList;

