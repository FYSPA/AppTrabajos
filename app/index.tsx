import ButtonWidget from "@/components/indexComponents/ButtonWidget";
import { Image, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
export default function Index() {
  return (
    <LinearGradient
      colors={["#1b5fbe", "#4d92f8", "#BFD1F0"]}
      style={styles.mainContainer}
    >
      <Image
        style={styles.tinyLogo}
        source={require("../assets/indexImages/logo.png")}
      />
      <ButtonWidget></ButtonWidget>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  botonIr: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  textoBoton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },
});
