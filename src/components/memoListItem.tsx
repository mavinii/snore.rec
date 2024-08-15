import { Text, View, StyleSheet } from 'react-native';

const MemosListItem = ({ uri }: { uri: string }) =>{
    return (
        <View style={styles.container}>
            <Text> {uri} </Text>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MemosListItem;