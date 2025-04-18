# app.py
from flask import Flask, request, jsonify
import joblib
from utils import preprocess_input, FEATURE_KEYS

app = Flask(__name__)

# Load model
model = joblib.load('assets\ml\scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        X = preprocess_input(data)
        result = model.predict(X)[0]
        if result == 1:
            return jsonify({'anomaly': False})
        else:
            # Optional: per-feature deviation
            return jsonify({'anomaly': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/')
def index():
    return "SVM Anomaly Detector Running ✅"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
