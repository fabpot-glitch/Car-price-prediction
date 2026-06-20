import pickle
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

from xgboost import XGBRegressor


# Load cleaned dataset
df = pd.read_csv(
    "data/processed/cleaned_car_data.csv"
)

# Features and Target
X = df.drop("Price", axis=1)
y = df["Price"]

# Categorical columns
categorical_features = [
    "name",
    "company",
    "fuel_type"
]

# One Hot Encoding
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        )
    ],
    remainder="passthrough"
)

# XGBoost Model
model = XGBRegressor(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    objective="reg:squarederror"
)

# Pipeline
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", model)
])

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train
pipeline.fit(X_train, y_train)

# Predictions
predictions = pipeline.predict(X_test)

# Evaluate
score = r2_score(y_test, predictions)

print("=" * 50)
print("🚗 CAR PRICE PREDICTION MODEL")
print("=" * 50)
print(f"✅ R² Score : {score:.4f}")
print("=" * 50)

# Save Model
with open(
    "models/car_price_model.pkl",
    "wb"
) as file:
    pickle.dump(pipeline, file)

print("✅ Model saved successfully")
print("📁 models/car_price_model.pkl")