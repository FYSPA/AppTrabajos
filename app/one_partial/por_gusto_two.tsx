import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const title = "App Notas - 2";

interface Note {
    id: string;
    text: string;
    completed: boolean;
}

export default function AppNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [text, setText] = useState("");

    const addNote = () => {
        if (text.trim() === "") return;
        setNotes([{ id: Date.now().toString(), text, completed: false }, ...notes]);
        setText("");
        Keyboard.dismiss();
    };

    const toggleComplete = (id: string) => {
        setNotes(notes.map(note => note.id === id ? { ...note, completed: !note.completed } : note));
    };

    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const renderItem = ({ item }: { item: Note }) => (
        <View style={styles.noteCard}>
            <TouchableOpacity style={styles.checkButton} onPress={() => toggleComplete(item.id)}>
                <Ionicons name={item.completed ? "checkmark-circle" : "ellipse-outline"} size={26} color={item.completed ? "#4CAF50" : "#CED4DA"} />
            </TouchableOpacity>
            <Text style={[styles.noteText, item.completed && styles.noteTextCompleted]}>{item.text}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mis Notas</Text>
                <Text style={styles.headerSubtitle}>{notes.length} {notes.length === 1 ? 'nota en total' : 'notas en total'}</Text>
            </View>

            <FlatList
                data={notes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={72} color="#E9ECEF" />
                        <Text style={styles.emptyText}>Aún no tienes notas</Text>
                        <Text style={styles.emptySubtext}>Escribe algo abajo para comenzar</Text>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe una nueva nota..."
                    placeholderTextColor="#ADB5BD"
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={addNote}
                />
                <TouchableOpacity style={styles.addButton} onPress={addNote}>
                    <Ionicons name="send" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '800',
        color: '#212529',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#868E96',
        marginTop: 6,
        fontWeight: '500',
    },
    listContainer: {
        padding: 20,
        flexGrow: 1,
        paddingBottom: 40,
    },
    noteCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
    },
    checkButton: {
        marginRight: 14,
    },
    noteText: {
        flex: 1,
        fontSize: 17,
        color: '#343A40',
        lineHeight: 24,
    },
    noteTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#ADB5BD',
        fontStyle: 'italic',
    },
    deleteButton: {
        padding: 8,
        marginLeft: 8,
        backgroundColor: '#FFF5F5',
        borderRadius: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    input: {
        flex: 1,
        height: 54,
        backgroundColor: '#F1F3F5',
        borderRadius: 27,
        paddingHorizontal: 24,
        fontSize: 16,
        color: '#212529',
    },
    addButton: {
        width: 54,
        height: 54,
        backgroundColor: '#4C6EF5',
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 14,
        shadowColor: '#4C6EF5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
    },
    emptyText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#495057',
        marginTop: 20,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#868E96',
        marginTop: 8,
        textAlign: 'center',
    },
});