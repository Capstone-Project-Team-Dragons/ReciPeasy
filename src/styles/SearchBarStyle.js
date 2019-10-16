import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#cccccc',
        height: 50,
        borderRadius: 5, 
        marginHorizontal: 15,
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 5,
        width: 345
    },
    input: {
        flex: 1,
        fontSize: 18
    },
    addButton: {
        marginTop: 2,
        width: 60,
        justifyContent: 'center',
        marginHorizontal: 7,
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F2C04C',
    },
})

export default styles;