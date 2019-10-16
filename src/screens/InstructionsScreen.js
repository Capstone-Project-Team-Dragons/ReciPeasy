import React from 'react';
import { View, Text, FlatList } from 'react-native';
import InstructionList from '../components/InstructionList';
import styles from '../styles/InstructionsScreenStyle';

const InstructionScreen = ({ navigation }) => {
    const additionalInfo = navigation.getParam('additionalInfo');
    const prepTime = navigation.getParam('prepTime');
    const servings = navigation.getParam('servings');

    const convertPrepTime = (prepTime) => {
        let readyTime = "";
        if (prepTime <= 60 && prepTime > 0) {
            readyTime = `${prepTime} Minutes`;
        } else {
            const hours = Math.floor(prepTime / 60);
            const minutes = prepTime % 60;
            readyTime = `${hours} Hours`;
            if (minutes > 0){
                readyTime +=  ` ${minutes} Minutes`;
            }
        }
        return readyTime;
    }

    return (
        <View style={styles.container}>
            <Text  style={styles.textTitle}>Recipe Instructions</Text>

            {
                prepTime !== 0 && servings !== 0 ? 
                (
                <View style={styles.addtional}>
                    <Text style={styles.textAddtional}>Prep and Cook Time: { convertPrepTime(prepTime) }</Text>
                    <Text style={styles.textAddtional}>Servings: { servings }</Text>
                </View>
                ) : null
            }
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