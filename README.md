# 🚗 Car Price Prediction Using Machine Learning

A Machine Learning-based web application that predicts the estimated market price of a used car based on various features such as car model, company, manufacturing year, kilometers driven, and fuel type.

## 📌 Project Overview

This project uses Machine Learning and Flask to estimate the resale value of used cars. The model is trained on the Quikr Used Car Dataset and performs data cleaning, feature engineering, and price prediction through an interactive web interface.

## ✨ Features

* Predicts used car prices instantly
* Interactive and responsive user interface
* Data preprocessing and cleaning pipeline
* Feature engineering using car age
* XGBoost Regression model
* Flask-based web application
* Real-time prediction results
* Mobile-friendly design

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask

### Machine Learning

* Pandas
* NumPy
* Scikit-Learn
* XGBoost

---

## 📂 Project Structure

```text
Car-Price-Predictor/
│
├── app/
│   ├── static/
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── templates/
│   │   └── index.html
│   │
│   └── app.py
│
├── data/
│   ├── raw/
│   │   └── quikr_car.csv
│   │
│   └── processed/
│       └── cleaned_car_data.csv
│
├── models/
│   └── car_price_model.pkl
│
├── src/
│   ├── data_preprocessing.py
│   ├── train_model.py
│   ├── predict.py
│   └── utils.py
│
├── requirements.txt
└── README.md
```

---

## 📊 Dataset

Dataset Used: Quikr Used Car Dataset

Features:

* Car Name
* Company
* Year
* Kilometers Driven
* Fuel Type
* Price

---

## ⚙️ Data Preprocessing

The following preprocessing steps were performed:

* Removed invalid price values
* Converted price to numerical format
* Cleaned kilometer values
* Removed missing values
* Removed outliers
* Added car_age feature
* Prepared data for machine learning training

---

## 🤖 Model Training

Model Used:

### XGBoost Regressor

Performance:

```text
R² Score: 0.5864
```

Additional techniques:

* One-Hot Encoding
* Column Transformer
* Pipeline Architecture
* Train-Test Split

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/fabpot-glitch/Car-price-prediction.git
cd Car-price-prediction
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Run Data Preprocessing

```bash
python src/data_preprocessing.py
```

---

## ▶️ Train Model

```bash
python src/train_model.py
```

---

## ▶️ Run Flask Application

```bash
cd app
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

---

## 📸 Application Workflow

1. Enter Car Details
2. Click Predict Price
3. Model Processes Input
4. Estimated Price is Displayed
5. User Receives Instant Prediction

---

## 🎯 Future Improvements

* Dynamic dropdowns from dataset
* Model comparison dashboard
* Deployment on Render
* User prediction history
* Improved model accuracy
* Data visualization dashboard

---

## 👩‍💻 Author

**Sake Nikhitha**

Final Year B.Tech Student

Interested in:

* Machine Learning
* Artificial Intelligence
* Full Stack Development
* Data Science

---

## ⭐ If you found this project useful

Please consider giving it a star on GitHub.
