import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const { promptAsync } = useGoogleLogin();

  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="school" size={60} color="#4285F4" />
        </View>

        <Text style={styles.title}>Aula Virtual</Text>
        <Text style={styles.subtitle}>
          Conecta tu cuenta institucional para sincronizar tus materias y
          calificaciones.
        </Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          activeOpacity={0.8}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color="#fff"
            style={styles.btnIcon}
          />
          <Text style={styles.btnText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Al continuar, aceptas los términos de servicio.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topCircle: {
    position: "absolute",
    top: -100,
    left: -50,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width,
    backgroundColor: "#E8F0FE",
    zIndex: 1,
  },
  content: {
    zIndex: 10,
    width: "85%",
    alignItems: "center",
  },
  iconCircle: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#4285F4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    width: "100%",
    height: 55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4285F4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btnIcon: {
    marginRight: 10,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: "#aaa",
    fontWeight: 100,
  },
});
