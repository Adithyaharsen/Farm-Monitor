import axios from 'axios';

let anomalies: string[] = [];

const payload = {
  nitrogen: 30,
  phosphorus: 20,
  potassium: 40,
  temperature: 27,
  moisture: 50,
};

axios
  .post('http://172.22.8.168:5000/predict', payload)
  .then((response) => {
    anomalies = response.data.anomalous_features || [];
    console.log('Anomalous Features:', anomalies);
  })
  .catch((error) => {
    console.error('Error fetching anomalies:', error);
  });