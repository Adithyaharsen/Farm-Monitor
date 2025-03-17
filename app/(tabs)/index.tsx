import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={require('@/assets/images/profile.png')} style={styles.profileImage} />
        <Text style={styles.name}>Client Name</Text>
        <Text style={styles.location}>City, State, Country</Text>
        <Text style={styles.detail1}>Detail 1: -------------------</Text>
        <Text style={styles.detail1}>Detail 2: ++++++++++</Text>
      </View>
      <TouchableOpacity
        style={[styles.aboutButton, showAbout && styles.closeButton]}
        onPress={() => setShowAbout(!showAbout)}>
        <MaterialIcons name={showAbout ? "close" : "info"} size={24} color="#fff" />
        <Text style={styles.aboutButtonText}>{showAbout ? "Close" : "About"}</Text>
      </TouchableOpacity>
      {showAbout && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>"Smart Agriculture through IoT and Cloud-Based Real-Time Insights and Mobile Solutions"</Text>
            <Text style={styles.descriptionText1}>This project aims to enhance agricultural productivity and sustainability by integrating 
            IoT sensors and machine learning into a mobile application. The system enables real-time monitoring of critical agricultural 
            parameters such as soil moisture, temperature, humidity, pH, and rainfall, transmitting data via low-power networks (LoRa)
            to a cloud-based platform. Advanced analytics and AI algorithms process the data to provide insights for irrigation,
            fertilization, and pest management. The application ensures efficient resource utilization, reduces wastage,
            and helps farmers make data-driven decisions for optimized crop yield and sustainable farming.</Text>
          </View>
            <View style={styles.profileCard}>
              <Image source={require('@/assets/images/Adithya.jpg')} style={styles.profileImage} />
              <Text style={styles.name}>R.V.Adithya Harsen</Text>
              <Text style={styles.detail}>Role:       Full-Stack Developer</Text>
              <Text style={styles.detail}>Contact: 94860 43779</Text>
              <Text style={styles.detail}>Email:     harsenadithya@gmail.com</Text>
            </View>
            <View style={styles.profileCard}>
              <Image source={require('@/assets/images/Naveen.jpg')} style={styles.profileImage} />
              <Text style={styles.name}>R.Naveen</Text>
              <Text style={styles.detail}>Role:       ML Engineer</Text>
              <Text style={styles.detail}>Contact: 86104 26363</Text>
              <Text style={styles.detail}>Email:     naveenramji2004@gmail.com</Text>
            </View>
            <View style={styles.profileCard}>
              <Image source={require('@/assets/images/Roshan.jpg')} style={styles.profileImage} />
              <Text style={styles.name}>Roshan Anto Kandangkulathe Regi Paulson</Text>
              <Text style={styles.detail}>Role:       IoT Infrastructure Architect</Text>
              <Text style={styles.detail}>Contact: 72001 89258</Text>
              <Text style={styles.detail}>Email:     roshanantokr@gmail.com</Text>
            </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingTop: 30,
    width: '100%',
  },
  profileCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: '80%',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: '#aaff4d',
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#ff6666',
    paddingBottom: 8,
    marginBottom: 10,
  },
  detail1: {
    fontSize: 14,
    textAlign:'center',
    color: '#ddd',
  },
  detail: {
    fontSize: 14,
    textAlign: 'left',
    color: '#ddd',
  },
  descriptionCard: {
    backgroundColor: '#2E2E2E',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 15,
    alignItems: 'center',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#aaff4d',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#ff6666',
    textAlign: 'center',
  },
  descriptionText1: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
