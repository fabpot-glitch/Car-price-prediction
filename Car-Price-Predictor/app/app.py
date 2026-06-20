from flask import Flask, render_template, request
import pickle
import pandas as pd

app = Flask(__name__)

# Load trained model
with open("../models/car_price_model.pkl", "rb") as file:
    model = pickle.load(file)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        year = int(request.form["year"])
        kms = int(request.form["kms"])

        data = pd.DataFrame({
            "name": [request.form["name"]],
            "company": [request.form["company"]],
            "year": [year],
            "kms_driven": [kms],
            "fuel_type": [request.form["fuel"]],
            "car_age": [2026 - year]
        })

        prediction = model.predict(data)[0]

        return render_template(
            "index.html",
            prediction=f"₹ {prediction:,.0f}"
        )

    except Exception as e:
        print("Prediction Error:", e)

        return render_template(
            "index.html",
            prediction=f"Error: {str(e)}"
        )


if __name__ == "__main__":
    app.run(debug=True)