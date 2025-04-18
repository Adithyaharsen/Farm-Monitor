import { Alert, View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { LogEntry } from './logs';
import axios from 'axios';

const API_URL = 'https://api.thingspeak.com/channels/2872903/feeds.json?api_key=2AOWTSFZ2LBH1SLI&results=1';

const [alertShown, setAlertShown] = useState(false);

const cardColors: Record<keyof Omit<LogEntry, 'time' | 'color'>, { bgColor: string; valueBgColor: string }> = {
  nitrogen: { bgColor: '#ff4d4d', valueBgColor: '#ff6666' },
  phosphorus: { bgColor: '#ff944d', valueBgColor: '#ffad66' },
  potassium: { bgColor: '#ffcc4d', valueBgColor: '#ffd966' },
  temperature: { bgColor: '#aaff4d', valueBgColor: '#bfff66' },
  moisture: { bgColor: '#4dff88', valueBgColor: '#66ffaa' },
  ph: { bgColor: '#4dd2ff', valueBgColor: '#66e0ff' },
  conductivity: { bgColor: '#4d88ff', valueBgColor: '#6699ff' },
};

export default function ExploreScreen() {
  const [latestLog, setLatestLog] = useState<LogEntry | null>(null);

  // Fetch the latest log entry from ThingSpeak
  useEffect(() => {
    const fetchLatestLog = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const entry = data.feeds[0]; // Get the latest log
        
        const response1 = await axios.post("http://192.168.1.124:5000/predict", {
          nitrogen: entry.field5,
          phosphorus: entry.field6,
          potassium: entry.field7,
          temperature: entry.field1,
          moisture: entry.field2,
        });
        const anomaly = response1.data.anomaly;
        

        if (entry) {
          setLatestLog({
            time: new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            nitrogen: entry.field5 ? `${entry.field5}mg/kg` : 'N/A',
            phosphorus: entry.field6 ? `${entry.field6}mg/kg` : 'N/A',
            potassium: entry.field7 ? `${entry.field7}mg/kg` : 'N/A',
            temperature: entry.field1 ? `${entry.field1}°C` : 'N/A',
            moisture: entry.field2 ? `${entry.field2}%RH` : 'N/A',
            ph: entry.field4 ? entry.field4 : 'N/A',
            conductivity: entry.field3 ? `${entry.field3}mm` : 'N/A',
            color: '#4d88ff',
          });
          
          if (anomaly && !alertShown) {
            const anomalies = response1.data.anomalous_features;
            Alert.alert(
              "⚠️ Anomaly Detected",
              `Anomaly arose in: ${anomalies.join(', ')}`,
              [{ text: "OK", onPress: () => console.log("Alert closed") }]
            );
            setAlertShown(true); // Avoid future alerts until app reloads or you reset it
          }
        }
      } catch (error) {
        console.error('Error fetching latest log:', error);
      }
    };

    fetchLatestLog(); // Fetch initially
    const interval = setInterval(fetchLatestLog, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!latestLog) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <View style={styles.container}>
      {Object.keys(latestLog).map((key, index) =>
        key !== 'time' && key !== 'color' ? (
          <View key={index} style={[styles.card, { backgroundColor: cardColors[key as keyof typeof cardColors].bgColor }]}>
            <Text style={styles.cardTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <View style={[styles.cardValueContainer, { backgroundColor: cardColors[key as keyof typeof cardColors].valueBgColor }]}>
              <Text style={styles.cardValue}>{latestLog[key as keyof LogEntry]}</Text>
            </View>
          </View>
        ) : null
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    width: '40%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  cardValueContainer: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  cardValue: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
