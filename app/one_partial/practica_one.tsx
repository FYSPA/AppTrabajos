import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export const title = "Práctica 1 - Impresión de Nombres";

export default function PracticaOne() {
    const [nombre, setNombre] = useState('');
    const [listaNombres, setListaNombres] = useState<string[]>([]);

    const agregarNombre = () => {
        if (nombre.trim().length > 0) {
            setListaNombres([...listaNombres, nombre.trim()]);
            setNombre('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Error', 'Por favor escribe un nombre válido');
        }
    };

    const saludar = (nombreSeleccionado: string) => {
        Alert.alert(
            "¡Hola!",
            `Hola ${nombreSeleccionado}, ¿cómo estás hoy?`,
            [{ text: "OK" }]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ingresa un nombre:</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pedro"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <Pressable style={styles.button} onPress={agregarNombre}>
                    <Ionicons name="add-circle" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Agregar</Text>
                </Pressable>
            </View>

            <Text style={styles.listTitle}>Lista de Nombres:</Text>

            <FlatList
                data={listaNombres}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [styles.nameCard, pressed && styles.pressed]}
                        onPress={() => saludar(item)}
                    >
                        <Ionicons name="person-outline" size={20} color="#4a90e2" />
                        <Text style={styles.nameText}>{item}</Text>
                        <Ionicons name="chevron-forward" size={18} color="#ccc" />
                    </Pressable>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Aun no hay nombres en la lista</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#4a90e2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 12,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10,
    },
    nameCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    pressed: {
        backgroundColor: '#f0f7ff',
        opacity: 0.9,
    },
    nameText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 30,
        fontStyle: 'italic',
    },
});