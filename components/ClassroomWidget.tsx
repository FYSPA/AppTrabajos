// components/ClassroomWidget.tsx
import React from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { useClassroomGrades } from '../hooks/useClassroomGrades';
import { GradeData } from '../types/classroom';

export default function ClassroomWidget() {
  const { token, promptAsync, request } = useGoogleLogin();
  const { grades, loading, error } = useClassroomGrades(token);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vincula tu Classroom</Text>
        <Button
          disabled={!request}
          title="Conectar con Google"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={{textAlign: 'center', marginTop: 10}}>Cargando calificaciones...</Text>
      </View>
    );
  }

  if (error) {
     return (
        <View style={styles.container}>
            <Text style={{color: 'red'}}>{error}</Text>
        </View>
     )
  }

  const renderItem: ListRenderItem<GradeData> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.course}>{item.courseName}</Text>
      <Text style={styles.workTitle}>{item.title}</Text>
      <Text style={styles.grade}>Nota: {item.grade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Calificaciones</Text>
      {grades.length === 0 ? (
        <Text style={{textAlign: 'center', color: '#666'}}>No se encontraron tareas en el primer curso.</Text>
      ) : (
        <FlatList
          data={grades}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    minHeight: 200, // Para que no colapse si está vacío
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  list: {
    width: '100%',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
  },
  course: {
    fontSize: 10,
    color: '#888',
    textTransform: 'uppercase',
  },
  workTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  grade: {
    fontSize: 14,
    color: '#2a9d8f',
    marginTop: 4,
    fontWeight: 'bold',
  }
});