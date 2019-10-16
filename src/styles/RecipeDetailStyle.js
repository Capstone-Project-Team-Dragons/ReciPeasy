import { StyleSheet } from 'react-native';

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

export default styles;
