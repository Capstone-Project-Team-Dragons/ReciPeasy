import React from 'react';
import { View, Text, FlatList } from 'react-native';
import InstructionList from '../components/InstructionList';
import styles from '../styles/InstructionsScreenStyle';

const InstructionScreen = ({ navigation}) => {
    const addtionalInfo = navigation.getParam('addtionalInfo');

    return (
        <View style={styles.container}>
            <Text  style={styles.textTitle}>Instruction Details</Text>
            <View style={styles.addtional}>
                 <Text style={styles.textAddtional}>Prep and Cook Time (In Minutes): { addtionalInfo["readyInMinutes"]}</Text>
                 <Text style={styles.textAddtional}>Servings: {addtionalInfo["servings"]}</Text>
            </View>
            <FlatList
                data={addtionalInfo.data["analyzedInstructions"]}
                keyExtractor={(item, index) => 'key2'+ index}
                renderItem={({ item, index }) => {
                    return ( <InstructionList allInstructions={item} /> );
                    }
                }
            />
        </View>
    )
}

export default InstructionScreen;