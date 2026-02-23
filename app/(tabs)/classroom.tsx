import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ClassroomGradeCard } from "../../components/ClassroomGradeCard";
import { useClassroomGrades } from "../../hooks/useClassroomGrades";

const COURSE_ID: string = "842992389296";

export default function ClassroomScreen() {
    const { grades, loading, error, refetch } = useClassroomGrades(COURSE_ID);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="school" size={40} color="#fff" />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>Mis Calificaciones</Text>
                    <Text style={styles.headerSubtitle}>Clase Específica</Text>
                </View>
            </View>

            {error ? (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle" size={40} color="#FF3B30" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#4285F4" />
                    <Text style={styles.loadingText}>Obteniendo calificaciones...</Text>
                </View>
            ) : grades.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Ionicons name="document-text-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No hay tareas configuradas o la lista está vacía.</Text>
                </View>
            ) : (
                <FlatList
                    data={grades}
                    keyExtractor={(item, index) => `${item.courseWorkId}-${index}`}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => <ClassroomGradeCard item={item} />}
                    onRefresh={refetch}
                    refreshing={loading}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
    },
    header: {
        backgroundColor: "#4285F4",
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: "#4285F4",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    headerTextContainer: {
        marginLeft: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 2,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: "#666",
        fontWeight: "500",
    },
    emptyText: {
        marginTop: 15,
        fontSize: 16,
        color: "#999",
        textAlign: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    errorText: {
        marginTop: 15,
        fontSize: 16,
        color: "#FF3B30",
        textAlign: "center",
        fontWeight: "500",
    },
    listContainer: {
        padding: 20,
        paddingTop: 30,
    },
});
