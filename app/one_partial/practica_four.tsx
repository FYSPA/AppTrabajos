import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const title = "Practica 4 - Botones";

export default function PracticaFour() {
    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);

    const incrementColor = (value: number) => {
        return value + 5 > 255 ? 0 : value + 5;
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={() => setR(incrementColor(r))}
                >
                    <Text style={styles.buttonText}>Rojo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => setG(incrementColor(g))}
                >
                    <Text style={styles.buttonText}>Verde</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'blue' }]}
                    onPress={() => setB(incrementColor(b))}
                >
                    <Text style={styles.buttonText}>Azul</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.label, { backgroundColor: `rgb(${r}, ${g}, ${b})` }]}>
                RGB: {r}, {g}, {b}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 40,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        paddingVertical: 30,
        paddingHorizontal: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        borderRadius: 10,
        overflow: 'hidden',
    },
});