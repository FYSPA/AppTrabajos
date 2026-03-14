import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface RegistroSemana {
    n: number;
    residuos: number;
}

export const title = "EcoCbtis225";

export default function PorGustoThree() {
    const [r0, setR0] = useState<string>('100');
    const [tasa, setTasa] = useState<string>('0.05'); // r = 0.05 (5%)
    const [semanas, setSemanas] = useState<string>('10');

    const [tabla, setTabla] = useState<RegistroSemana[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);

    const ejecutarSimulacion = () => {
        const inicial = parseFloat(r0);
        const r = parseFloat(tasa);
        const nTotal = parseInt(semanas);

        if (isNaN(inicial) || isNaN(r) || isNaN(nTotal)) return;

        let tempTabla: RegistroSemana[] = [];
        let tempGrafica: number[] = [inicial];

        for (let n = 1; n <= nTotal; n++) {
            const R = inicial * Math.pow((1 + r), n);
            tempTabla.push({ n: n, residuos: R });
            tempGrafica.push(R);
        }

        setTabla(tempTabla);
        setChartData(tempGrafica);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.title}>Eco CBTis 225: Simulador</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Residuos Iniciales (R0):</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={r0} onChangeText={setR0} />

                <Text style={styles.label}>Tasa de crecimiento (r):</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={tasa} onChangeText={setTasa} />

                <Text style={styles.label}>Semanas (n):</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={semanas} onChangeText={setSemanas} />

                <TouchableOpacity style={styles.button} onPress={ejecutarSimulacion}>
                    <Text style={styles.buttonText}>CALCULAR PROYECCIÓN</Text>
                </TouchableOpacity>
            </View>

            {tabla.length > 0 && (
                <View style={styles.resultContainer}>
                    <Text style={styles.sectionTitle}>Tabla de Resultados (Fase 3)</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>n (Semana)</Text>
                        <Text style={styles.headerText}>R (Residuos kg)</Text>
                    </View>
                    {tabla.map((item) => (
                        <View key={item.n} style={styles.tableRow}>
                            <Text style={styles.rowText}>{item.n}</Text>
                            <Text style={styles.rowText}>{item.residuos.toFixed(2)} kg</Text>
                        </View>
                    ))}

                    <Text style={styles.sectionTitle}>Análisis Visual del Modelo</Text>
                    <LineChart
                        data={{
                            labels: tabla.filter(i => i.n % 2 === 0 || i.n === 1).map(i => `S${i.n}`),
                            datasets: [{ data: chartData }]
                        }}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                    <Text style={styles.infoLímite}>
                        {parseFloat(tasa) > 0
                            ? "Tendencia: Divergente (Crecimiento Infinito)"
                            : "Tendencia: Convergente (Reducción a 0)"}
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3,
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F1F8E9', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginTop: 20, marginBottom: 20 },
    card: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, elevation: 5 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 5 },
    input: { borderBottomWidth: 1, borderColor: '#A5D6A7', marginBottom: 15, padding: 5, fontSize: 16 },
    button: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
    resultContainer: { marginTop: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 10, textAlign: 'center' },
    tableHeader: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2E7D32', padding: 10, borderRadius: 5 },
    headerText: { color: '#FFF', fontWeight: 'bold' },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    rowText: { fontSize: 14, color: '#444' },
    chart: { marginVertical: 15, borderRadius: 16 },
    infoLímite: { textAlign: 'center', fontWeight: 'bold', color: '#C62828', marginTop: 10 }
});