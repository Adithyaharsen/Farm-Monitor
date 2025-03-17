import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      {cardData.slice(0, 6).map((card, index) => (
        <View key={index} style={[styles.card, { backgroundColor: card.bgColor }]}> 
          <Text style={styles.cardTitle}>{card.title}</Text>
          <View style={[styles.cardValueContainer, { backgroundColor: card.valueBgColor }]}> 
            <Text style={styles.cardValue}>{card.value}</Text>
          </View>
        </View>
      ))}
      <View style={[styles.card, styles.bottomCenteredCard, { backgroundColor: cardData[6].bgColor }]}> 
        <Text style={styles.cardTitle}>{cardData[6].title}</Text>
        <View style={[styles.cardValueContainer, { backgroundColor: cardData[6].valueBgColor }]}> 
          <Text style={styles.cardValue}>{cardData[6].value}</Text>
        </View>
      </View>
    </View>
  );
}

const cardData = [
  { title: 'Nitrogen', value: '10', bgColor: '#ff4d4d', valueBgColor: '#ff6666' },
  { title: 'Phosphorus', value: '20', bgColor: '#ff944d', valueBgColor: '#ffad66' },
  { title: 'Potassium', value: '30', bgColor: '#ffcc4d', valueBgColor: '#ffd966' },
  { title: 'Temperature', value: '40.0000000', bgColor: '#aaff4d', valueBgColor: '#bfff66' },
  { title: 'Humidity', value: '50.0000000', bgColor: '#4dff88', valueBgColor: '#66ffaa' },
  { title: 'Ph', value: '60.000000000', bgColor: '#4dd2ff', valueBgColor: '#66e0ff' },
  { title: 'Rainfall', value: '70.0000000', bgColor: '#4d88ff', valueBgColor: '#6699ff' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    paddingTop: 70, // Added spacing at the top
    backgroundColor: '#000',
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
  bottomCenteredCard: {
    alignSelf: 'center',
    marginTop: 20,
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
