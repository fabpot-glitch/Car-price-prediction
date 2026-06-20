import pickle
import pandas as pd

with open(
    "models/car_price_model.pkl",
    "rb"
) as file:
    model = pickle.load(file)

sample = pd.DataFrame({
    "name": ["Hyundai Santro Xing"],
    "company": ["Hyundai"],
    "year": [2015],
    "kms_driven": [45000],
    "fuel_type": ["Petrol"]
})

prediction = model.predict(sample)

print(f"Predicted Price: ₹{prediction[0]:,.0f}")