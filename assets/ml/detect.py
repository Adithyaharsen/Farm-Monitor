# detect_anomalies.py
import sys
import json
import joblib
import numpy as np

FEATURE_KEYS = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'moisture']

def main():
    if len(sys.argv) != 6:
        print(json.dumps({"error": "Expected 5 input arguments"}))
        sys.exit(1)

    try:
        values = list(map(float, sys.argv[1:]))
        x = np.array(values).reshape(1, -1)

        scaler = joblib.load("scaler.pkl")
        model = joblib.load("svm_model.pkl")

        x_scaled = scaler.transform(x)
        result = model.predict(x_scaled)[0]

        anomalies = []
        if result == 0:
            for i, val in enumerate(x_scaled[0]):
                if abs(val) > 3:  # z-score threshold
                    anomalies.append(FEATURE_KEYS[i])

        print(json.dumps(anomalies))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if _name_ == "_main_":
    main()