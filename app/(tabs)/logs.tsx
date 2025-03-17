import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { RadioButton } from 'react-native-paper';

export default function LogsScreen() {
  const [selectedAttribute, setSelectedAttribute] = useState('Nitrogen');
  const attributes = ['Nitrogen', 'Phosphorus', 'Potassium', 'Temperature', 'Humidity', 'Ph', 'Rainfall'];

  return (
    <View style={styles.container}>
      <View style={styles.radioGroup}>
        {attributes.map((attr) => (
          <View key={attr} style={styles.radioButtonContainer}>
            <RadioButton
              value={attr}
              status={selectedAttribute === attr ? 'checked' : 'unchecked'}
              onPress={() => setSelectedAttribute(attr)}
              color="#fff"
            />
            <Text style={styles.radioText}>{attr}</Text>
          </View>
        ))}
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Time</Text>
        <Text style={styles.headerText}>{selectedAttribute}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {logData.map((log, index) => (
          <View key={index} style={[styles.row, { backgroundColor: log.color }]}> 
            <Text style={styles.cell}>{log.time}</Text>
            <Text style={styles.cell}>{log[selectedAttribute.toLowerCase() as keyof LogEntry] || 'N/A'}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const generateLogs = () => {
  const colors = ['#1E1E1E', '#252525', '#2E2E2E', '#3A3A3A'];
  let logs = [];
  let currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0);
  for (let i = 0; i < 50; i++) {
    logs.push({
      time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      nitrogen: `${Math.floor(Math.random() * 10) + 15}%`,
      phosphorus: `${Math.floor(Math.random() * 10) + 10}%`,
      potassium: `${Math.floor(Math.random() * 10) + 5}%`,
      temperature: `${Math.floor(Math.random() * 15) + 20}°C`,
      humidity: `${Math.floor(Math.random() * 40) + 40}%`,
      ph: `${(Math.random() * 2 + 5).toFixed(1)}`,
      rainfall: `${Math.floor(Math.random() * 20) + 1}mm`,
      color: colors[i % colors.length],
    });
    currentTime.setMinutes(currentTime.getMinutes() + 15);
  }
  return logs;
};

const logData = generateLogs();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#000',
  },
  scrollView: {
    marginTop: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioText: {
    color: '#fff',
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  cell: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
