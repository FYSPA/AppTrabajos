import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GradeItem } from "../hooks/useClassroomGrades";

interface Props {
    item: GradeItem;
}

export const ClassroomGradeCard = ({ item }: Props) => {
    const getStatusColor = (state: string) => {
        switch (state) {
            case "RETURNED":
                return "#34C759";
            case "TURNED_IN":
                return "#007AFF";
            case "CREATED":
            case "NEW":
            default:
                return "#FF3B30";
        }
    };

    const getStatusText = (state: string) => {
        switch (state) {
            case "RETURNED":
                return "Calificada";
            case "TURNED_IN":
                return "Entregada";
            case "CREATED":
            case "NEW":
            default:
                return "Pendiente";
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <Ionicons name="journal" size={24} color="#4285F4" />
                </View>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(item.state) },
                        ]}
                    >
                        <Text style={styles.statusText}>{getStatusText(item.state)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.gradeContainer}>
                <Text style={styles.gradeLabel}>Calificación final:</Text>
                <Text style={styles.gradeValue}>
                    {item.assignedGrade !== undefined ? `${item.assignedGrade} / 100` : "Sin calificar"}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: "rgba(66, 133, 244, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    cardTitleContainer: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    gradeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 15,
        borderRadius: 15,
        marginTop: 5,
    },
    gradeLabel: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    gradeValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
});
