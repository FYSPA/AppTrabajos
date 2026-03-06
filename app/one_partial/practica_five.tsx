import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const title = "Practica 5 - Aprender Tablas";

export default function PracticaFive() {
  const [number, setNumber] = useState(0);
  const [numberOne, setNumberOne] = useState('');
  const [numberTwo, setNumberTwo] = useState('');
  const [attempts, setAttempts] = useState(5);

  const [failedNumber, setFailedNumber] = useState<string | null>(null);
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const generateRandomNumbers = () => {
    const randomOne = Math.floor(Math.random() * 10) + 1;
    const randomTwo = Math.floor(Math.random() * 10) + 1;
    setNumberOne(randomOne.toString());
    setNumberTwo(randomTwo.toString());
  };

  const resetOperation = () => {
    generateRandomNumbers()
    setNumber(0)
    setAttempts(5);
    setFailedNumber(null);
  }

  const verifyResult = () => {
    const result = Number(numberOne) * Number(numberTwo);

    if (Number(number) === result) {
      alert("Multiplicación Correcta");
      resetOperation();
    } else {
      const remainingAttempts = attempts - 1;

      if (remainingAttempts === 0) {
        alert("Multiplicación Incorrecta. El resultado era: " + result);
        setFailedNumber(numberOne);
        setAttempts(5);
      } else {
        setAttempts(remainingAttempts);
        if (remainingAttempts === 3) {
          alert("Tú puedes, te falta poco. Te quedan 3 intentos.");
        } else {
          alert("Incorrecto. Te quedan " + remainingAttempts + " intentos.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.operationContainer}>
        <Text style={styles.numberDisplay}>{numberOne || '0'}</Text>
        <Text style={styles.operator}> * </Text>
        <Text style={styles.numberDisplay}>{numberTwo || '0'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={generateRandomNumbers}>
        <Text style={styles.buttonText}>Generar Numeros</Text>
      </TouchableOpacity>


      <Text style={styles.text}>Escribe el resultado de la multiplicacion</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Ej: 5"
        value={number.toString()}
        onChangeText={(text) => setNumber(Number(text))}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={verifyResult}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>

      {failedNumber && (
        <View style={styles.table}>
          <Text style={styles.tableTitle}>Repasa la tabla del {failedNumber}:</Text>
          {rows.map((row) => (
            <Text key={row} style={styles.rowText}>
              {failedNumber} x {row} ={" "}
              <Text style={styles.result}>{Number(failedNumber) * row}</Text>
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  operationContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberDisplay: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  operator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginHorizontal: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    height: 50,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e74c3c',
    fontWeight: 100,
    margin: 30,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e74c3c'
  },
  rowText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  result: {
    fontWeight: 100,
    color: '#cc2e2eff',
  }
});