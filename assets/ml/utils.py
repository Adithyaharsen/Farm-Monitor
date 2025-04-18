# utils.py
import numpy as np

# Features must match what was used in training
FEATURE_KEYS = ['nitrogen', 'phosphorus', 'potassium', 'temperature', 'moisture']

def preprocess_input(data):
    try:
        x = [float(data[key]) for key in FEATURE_KEYS]
        return np.array(x).reshape(1, -1)
    except KeyError as e:
        raise ValueError(f"Missing key in input: {e}")
