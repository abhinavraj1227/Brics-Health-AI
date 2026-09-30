import numpy as np
from sklearn.ensemble import RandomForestRegressor
import warnings

# Suppress sklearn warnings for cleaner terminal output
warnings.filterwarnings('ignore')

class ResourcePredictor:
    def __init__(self):
        # 1. Initialize the Machine Learning model
        self.model = RandomForestRegressor(n_estimators=50, max_depth=5, random_state=42)
        
        # 2. Generate synthetic historical training data
        # Features: [infection_rate, supply_chain_disruption, temperature_anomaly]
        # X represents past scenarios, y represents the resulting bed occupancy
        np.random.seed(42)
        X_train = np.random.rand(200, 3) * 100 
        
        # Target: Create a realistic correlation where higher infections and disruptions increase bed usage
        y_train = (X_train[:, 0] * 0.45) + (X_train[:, 1] * 0.25) + (X_train[:, 2] * 0.1) + 20
        y_train = np.clip(y_train, 0, 100) # Cap between 0% and 100%
        
        # 3. Train the model on startup
        self.model.fit(X_train, y_train)
        print("✅ ML Predictor Model Trained Successfully!")

    def predict_occupancy(self, infection_rate, disruption, temp_anomaly):
        """Predicts live bed occupancy based on current environmental factors"""
        features = np.array([[infection_rate, disruption, temp_anomaly]])
        prediction = self.model.predict(features)[0]
        return round(prediction, 1)

# Instantiate a global predictor for the FastAPI routes to use
health_ai = ResourcePredictor()