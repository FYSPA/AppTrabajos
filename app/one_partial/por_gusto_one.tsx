import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const title = "Calculadora Sencilla - 1";

export default function PorGustoOne() {
  const [displayValue, setDisplayValue] = useState("");

  const leftButtons = [
    "Bor",
    "(",
    ")",
    "mod",
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "x",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "%",
    "+",
  ];
  const rightButtons = ["π", "√", "x²", "="];

  const handlePress = (val: string) => {
    if (val === "=") {
      calculateResul();
    } else if (val === "Bor") {
      setDisplayValue((prev) => prev.slice(0, -1));
    } else if (val === "√") {
      setDisplayValue((prev) => prev + "sqrt(");
    } else {
      setDisplayValue((prev) => prev + val);
    }
  };

  const calculateResul = () => {
    try {
      let expresion = displayValue
        .replace("x", "*")
        .replace("÷", "/")
        .replace("mod", "%")
        .replace("π ", "Math.PI")
        .replace("sqrt", "Math.sqrt")
        .replace("^2", "**2");

      const result = eval(expresion);

      setDisplayValue(String(result));
    } catch (error) {
      Alert.alert("Error", "Operacion No Valida");
      setDisplayValue("Error");
      setDisplayValue("");
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View>
        <TextInput
          value={displayValue}
          showSoftInputOnFocus={false}
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#666"
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.leftColumn}>
          {leftButtons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                btn === "Bor" ? styles.btnRed : styles.btnDark,
              ]}
              onPress={() => handlePress(btn)}
            >
              <Text style={styles.text}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.rightColumn}>
          {rightButtons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={btn === "=" ? styles.buttonIgual : styles.button}
              onPress={() => handlePress(btn)}
            >
              <Text style={styles.text}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    padding: 10,
    justifyContent: "flex-end",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    height: 70,
    borderRadius: 10,
    paddingLeft: 30,
    fontWeight: 100,
    color: "black",
    fontSize: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 0,
    margin: 0,
    padding: 0,
    marginTop: 20,
    justifyContent: "center",
  },

  leftColumn: {
    width: "76%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  rightColumn: {
    width: "18%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#333",
    height: 75,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
  },

  buttonIgual: {
    backgroundColor: "orange",
    height: 160,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  btnDark: { backgroundColor: "#333" },
  btnRed: { backgroundColor: "#D9534F" },
});
