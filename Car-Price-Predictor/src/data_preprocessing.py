import pandas as pd


def clean_data(input_path, output_path):

    # Load dataset
    car = pd.read_csv(input_path)

    # Remove rows with invalid price
    car = car[car["Price"] != "Ask For Price"]

    # Clean Price column
    car["Price"] = (
        car["Price"]
        .astype(str)
        .str.replace(",", "", regex=False)
        .astype(int)
    )

    # Clean Year column
    car = car[car["year"].astype(str).str.isnumeric()]
    car["year"] = car["year"].astype(int)

    # Remove missing kms
    car = car[car["kms_driven"].notnull()]

    # Clean kms_driven column
    car["kms_driven"] = (
        car["kms_driven"]
        .astype(str)
        .str.replace(" kms", "", regex=False)
        .str.replace(",", "", regex=False)
    )

    car = car[car["kms_driven"].str.isnumeric()]
    car["kms_driven"] = car["kms_driven"].astype(int)

    # Remove missing fuel type
    car = car[car["fuel_type"].notnull()]

    # Remove missing company
    car = car[car["company"].notnull()]

    # Remove missing name
    car = car[car["name"].notnull()]

    # Feature Engineering
    current_year = 2026
    car["car_age"] = current_year - car["year"]

    # Outlier Removal

    # Remove extremely expensive cars
    car = car[car["Price"] < 6000000]

    # Remove extremely old cars
    car = car[car["year"] > 1995]

    # Remove unrealistic mileage values
    car = car[car["kms_driven"] < 200000]

    # Remove negative ages if present
    car = car[car["car_age"] >= 0]

    # Reset index
    car.reset_index(drop=True, inplace=True)

    # Save cleaned dataset
    car.to_csv(output_path, index=False)

    print("=" * 50)
    print("🚗 CAR DATA PREPROCESSING COMPLETED")
    print("=" * 50)
    print(f"Final Shape : {car.shape}")
    print(f"Columns     : {list(car.columns)}")
    print(f"Saved To    : {output_path}")
    print("=" * 50)


if __name__ == "__main__":

    clean_data(
        "data/raw/quikr_car.csv",
        "data/processed/cleaned_car_data.csv"
    )