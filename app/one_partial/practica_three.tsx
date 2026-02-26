import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';

export const title = "Práctica 3 - Mezclador de Colores";

export default function PracticaThree() {
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    const [isSubtractMode, setIsSubtractMode] = useState(false);

    const PASO = 5;

    const handleColor = (current: number, setter: (val: number) => void) => {
        if (isSubtractMode) {
            setter(current - PASO < 0 ? 0 : current - PASO);
        } else {
            setter(current + PASO > 255 ? 255 : current + PASO);
        }
    };

    const reset = () => {
        setRed(0);
        setGreen(0);
        setBlue(0);
    };

    const finalColor = `rgb(${red}, ${green}, ${blue})`;
    const isLight = (red + green + blue) > 380;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.colorContainer}>
                <Pressable
                    onPress={() => handleColor(red, setRed)}
                    style={[styles.colorBox, { backgroundColor: '#FF5252' }]}
                >
                    <Ionicons name={isSubtractMode ? "remove" : "add"} size={22} color="white" />
                    <Text style={styles.buttonText}>Rojo</Text>
                    <Text style={styles.valueText}>{red}</Text>
                </Pressable>

                <Pressable
                    onPress={() => handleColor(green, setGreen)}
                    style={[styles.colorBox, { backgroundColor: '#4CAF50' }]}
                >
                    <Ionicons name={isSubtractMode ? "remove" : "add"} size={22} color="white" />
                    <Text style={styles.buttonText}>Verde</Text>
                    <Text style={styles.valueText}>{green}</Text>
                </Pressable>

                <Pressable
                    onPress={() => handleColor(blue, setBlue)}
                    style={[styles.colorBox, { backgroundColor: '#2196F3' }]}
                >
                    <Ionicons name={isSubtractMode ? "remove" : "add"} size={22} color="white" />
                    <Text style={styles.buttonText}>Azul</Text>
                    <Text style={styles.valueText}>{blue}</Text>
                </Pressable>
            </View>

            <View style={styles.resultSection}>
                <View style={[styles.colorSelected, { backgroundColor: finalColor }]}>
                    <Text style={[styles.resultLabel, { color: isLight ? '#000' : '#fff' }]}>
                        {finalColor}
                    </Text>
                </View>
            </View>

            <View style={styles.bottomControlsContainer}>
                <View style={styles.modeContainer}>
                    <Ionicons
                        name="add-circle"
                        size={24}
                        color={!isSubtractMode ? "#4a90e2" : "#ccc"}
                    />
                    <Switch
                        value={isSubtractMode}
                        onValueChange={(value) => setIsSubtractMode(value)}
                        trackColor={{ false: "#767577", true: "#fbc531" }}
                        thumbColor={isSubtractMode ? "#e74c3c" : "#f4f3f4"}
                    />
                    <Ionicons
                        name="remove-circle"
                        size={24}
                        color={isSubtractMode ? "#e74c3c" : "#ccc"}
                    />
                </View>

                {/* BOTÓN REINICIAR */}
                <Pressable onPress={reset} style={styles.resetButton}>
                    <Ionicons name="trash-outline" size={20} color="#666" />
                    <Text style={styles.resetText}>Reiniciar Mezcla</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        color: '#2d3436',
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    colorBox: {
        width: '31%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    valueText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    resultSection: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    resultSectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 15,
    },
    colorSelected: {
        width: '100%',
        height: 650,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    resultLabel: {
        fontWeight: '800',
        fontSize: 18,
        letterSpacing: 1,
    },

    bottomControlsContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#F5F7FA',
    },
    modeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        marginBottom: 10,
        elevation: 2,
    },
    modeText: {
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 10,
        minWidth: 90,
        textAlign: 'center',
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
    },
    resetText: {
        marginLeft: 8,
        color: '#666',
        fontWeight: '600',
        fontSize: 15,
    }
});