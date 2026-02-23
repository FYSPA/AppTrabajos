import { StyleSheet, Text, View } from "react-native";

export const title = "Todavia no hay nada";

export default function ActivityOneScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity One</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});