import json
import joblib
import numpy as np

model = joblib.load("svm_model.pkl")
scaler = joblib.load("scaler.pkl")

with open("mini proj/reading.json", "r") as f:
    data = json.load(f)

features = [
    data["Nitrogen"],
    data["Phosphorous"],
    data["Potassium"],
    data["Temparature"],
    data["Humidity"],
    data["Moisture"]
]

scaled = scaler.transform([features])
prediction = model.predict(scaled)

data["anomaly"] = bool(prediction[0] == -1)

with open("mini proj/reading.json", "w") as f:
    json.dump(data, f, indent=2)

print("JSON updated with anomaly status.")
