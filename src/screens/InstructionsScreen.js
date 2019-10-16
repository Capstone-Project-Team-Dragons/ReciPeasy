import React from 'react';
import { View, Text, FlatList } from 'react-native';
import InstructionList from '../components/InstructionList';
import styles from '../styles/InstructionsScreenStyle';

const InstructionScreen = ({ navigation}) => {
    const additionalInfo = navigation.getParam('additionalInfo');

    return (
        <View style={styles.container}>
            <Text  style={styles.textTitle}>Instruction Details</Text>
            <View style={styles.addtional}>
                 <Text style={styles.textAddtional}>Prep and Cook Time (In Minutes): { additionalInfo["readyInMinutes"]}</Text>
                 <Text style={styles.textAddtional}>Servings: {additionalInfo["servings"]}</Text>
            </View>
            <FlatList
                data={additionalInfo}
                keyExtractor={(item, index) => 'key2'+ index}
                renderItem={({ item, index }) => {
                    return ( 
                        <InstructionList allInstructions={item} /> 
                    );
                }
            }
            />
        </View>
    )
}

export default InstructionScreen;