import { StyleSheet, Text, View } from "react-native";

export const title = "App Notas - 2";
export default function AppNotes() {
    return (
        <View style={styles.mainContainer}>
            <Text>Hello</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 30,
    }
})