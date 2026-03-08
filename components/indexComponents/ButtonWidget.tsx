import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ButtonWidget() {
  const router = useRouter();
  const rutePage = "/one_partial";
  return (
    <TouchableOpacity
      style={styles.botonIr}
      onPress={() => router.push(rutePage)}
    >
      <Text style={styles.textoBoton}>Ir al inicio</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botonIr: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  textoBoton: {
    color: "black",
    fontSize: 18,
    fontWeight: "800",
  },
});
