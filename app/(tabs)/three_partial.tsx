import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

interface Activity {
    id: string;
    title: string;
    type: 'Práctica' | 'Actividad' | 'Por Gusto';
    ruta: string;
    icon: any;
}

interface Section {
    title: string;
    data: Activity[];
}

const getAutomatedData = (): Activity[] => {
    const context = require.context('../three_partial', false, /\.(js|jsx|ts|tsx)$/);

    return context.keys()
        .filter(key => key.includes('practica_') || key.includes('activity_') || key.includes('por_gusto_'))
        .map((key, index) => {
            const fileName = key.replace('./', '').replace(/\.(js|jsx|ts|tsx)$/, '');
            const isPractica = fileName.startsWith('practica_');
            const isActividad = fileName.startsWith('activity_');
            const module = context(key);

            const customTitle = module.title || fileName
                .replace('practica_', '')
                .replace('activity_', '')
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (l: string) => l.toUpperCase());

            return {
                id: index.toString(),
                title: customTitle,
                type: isPractica ? 'Práctica' : (isActividad ? 'Actividad' : 'Por Gusto'),
                ruta: `/three_partial/${fileName}`,
                icon: isPractica ? 'code-slash' : (isActividad ? 'book-outline' : 'star-outline')
            };
        });
};

const ActivityItem = ({ item }: { item: Activity }) => {
    const router = useRouter();
    const color = item.type === 'Práctica' ? '#4a90e2' : (item.type === 'Actividad' ? '#f39c12' : '#59b667ff');

    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(item.ruta as any)}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <Ionicons name={item.icon} size={22} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>Ver {item.type.toLowerCase()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
    );
};

export default function AutomaticListScreen() {
    const sections = useMemo(() => {
        const data = getAutomatedData();

        const groups = data.reduce((acc: Section[], item: Activity) => {
            const sectionName = item.type + 's';
            const section = acc.find(s => s.title === sectionName);

            if (section) {
                section.data.push(item);
            } else {
                acc.push({ title: sectionName, data: [item] });
            }
            return acc;
        }, []);

        return groups.sort((a, b) => b.title.localeCompare(a.title));
    }, []);

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<Text style={styles.mainTitle}>Tercer Parcial</Text>}
                renderItem={({ item }) => <ActivityItem item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                contentContainerStyle={{ padding: 20, paddingTop: 50 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    mainTitle: { fontSize: 28, fontWeight: '800', marginBottom: 10, color: '#2c3e50' },
    sectionHeader: { fontSize: 13, fontWeight: '700', color: '#95a5a6', marginTop: 25, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 16, marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
    cardPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
    iconContainer: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#34495e' },
    cardSubtitle: { fontSize: 12, color: '#bdc3c7' },
});