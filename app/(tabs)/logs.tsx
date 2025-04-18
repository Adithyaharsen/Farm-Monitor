import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';

// ✅ Define LogEntry type for fetched data
export type LogEntry = {
  time: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  moisture: string;
  ph: string;
  conductivity: string;
  color: string;
};

const API_URL = 'https://api.thingspeak.com/channels/2872903/feeds.json?api_key=2AOWTSFZ2LBH1SLI&results=50'; // Replace with your ThingSpeak channel ID

export default function LogsScreen() {
  const [selectedAttribute, setSelectedAttribute] = useState<keyof LogEntry>('nitrogen');
  const attributes: (keyof LogEntry)[] = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'moisture', 'ph', 'conductivity'];
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // ✅ Fetch data from ThingSpeak every 30 seconds
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.feeds) {
          const colors = ['#1E1E1E', '#252525', '#2E2E2E', '#3A3A3A'];
          const parsedLogs: LogEntry[] = data.feeds.map((entry: any, index: number) => ({
            time: new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            nitrogen: entry.field5 ? `${entry.field1}mg/kg` : 'N/A',
            phosphorus: entry.field6 ? `${entry.field2}mg/kg` : 'N/A',
            potassium: entry.field7 ? `${entry.field3}mg/kg` : 'N/A',
            temperature: entry.field1 ? `${entry.field4}°C` : 'N/A',
            moisture: entry.field2 ? `${entry.field5}%RH` : 'N/A',
            ph: entry.field6 ? entry.field4 : 'N/A',
            conductivity: entry.field3 ? `${entry.field7}us/cm` : 'N/A',
            color: colors[index % colors.length],
          }));

          setLogs(parsedLogs);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Attribute Selection */}
      <View style={styles.radioGroup}>
        {attributes.map((attr) => (
          <View key={attr} style={styles.radioButtonContainer}>
            <RadioButton
              value={attr}
              status={selectedAttribute === attr ? 'checked' : 'unchecked'}
              onPress={() => setSelectedAttribute(attr)}
              color="#fff"
            />
            <Text style={styles.radioText}>{attr.charAt(0).toUpperCase() + attr.slice(1)}</Text>
          </View>
        ))}
      </View>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Time</Text>
        <Text style={styles.headerText}>{selectedAttribute.charAt(0).toUpperCase() + selectedAttribute.slice(1)}</Text>
      </View>

      {/* Log Data */}
      <ScrollView style={styles.scrollView}>
        {logs.map((log, index) => (
          <View key={index} style={[styles.row, { backgroundColor: log.color }]}> 
            <Text style={styles.cell}>{log.time}</Text>
            <Text style={styles.cell}>{log[selectedAttribute] || 'N/A'}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// 🎨 Styles (Same as before)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 70, backgroundColor: '#000' },
  scrollView: { marginTop: 10 },
  radioGroup: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
  radioButtonContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  radioText: { color: '#fff', fontSize: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#fff' },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 10, marginBottom: 5, borderRadius: 10, elevation: 6 },
  cell: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
