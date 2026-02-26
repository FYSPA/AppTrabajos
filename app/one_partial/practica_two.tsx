import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export const title = "Práctica 2 - Tablas de Multiplicar";

export default function PracticaTwoScreen() {
  const [number, setNumber] = useState("");

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Escribe un número:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 5"
        value={number}
        onChangeText={(text) => setNumber(text)}
      />

      <View style={styles.table}>
        {number !== "" ? (
          rows.map((row) => (
            <Text key={row} style={styles.rowText}>
              {number} x {row} ={" "}
              <Text style={styles.result}>{parseInt(number) * row}</Text>
            </Text>
          ))
        ) : (
          <Text style={styles.placeholderText}>
            Ingresa un número para ver la magia
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
    fontWeight: 100,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rowText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
    color: "#444",
  },
  result: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  placeholderText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#999",
  },
});
