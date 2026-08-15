from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os


# ============================================================
# MEDICALAI - FASTAPI BACKEND
# ============================================================

app = FastAPI(
    title="MedicalAI API",
    description="Medical Tourism AI - Hospital Assistance Prototype",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATASET PATH
# ============================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "data",
    "HOSPITAL DATASET.xlsx"
)


# ============================================================
# LOAD DATASET
# ============================================================

try:

    df = pd.read_excel(DATASET_PATH)

    # Remove unnecessary spaces from column names
    df.columns = df.columns.astype(str).str.strip()

    print("========================================")
    print("MedicalAI Dataset Loaded Successfully")
    print("Dataset path:", DATASET_PATH)
    print("Rows:", len(df))
    print("Columns:", list(df.columns))
    print("========================================")

except Exception as error:

    df = pd.DataFrame()

    print("========================================")
    print("ERROR LOADING DATASET")
    print(error)
    print("Expected file:")
    print(DATASET_PATH)
    print("========================================")


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def home():

    return {
        "message": "MedicalAI Backend is running successfully",
        "status": "online"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "dataset_loaded": not df.empty,
        "records": len(df)
    }


# ============================================================
# GET AVAILABLE DISTRICTS
# ============================================================

@app.get("/districts")
def get_districts():

    if df.empty:

        return {
            "error": "Dataset is not loaded"
        }

    if "District" not in df.columns:

        return {
            "error": "District column not found in dataset"
        }

    districts = (
        df["District"]
        .dropna()
        .astype(str)
        .str.strip()
        .unique()
        .tolist()
    )

    districts.sort()

    return districts


# ============================================================
# HOSPITAL SEARCH
# ============================================================

@app.get("/hospitals/search")
def search_hospitals(
    district: str = Query(
        None,
        description="District name"
    ),
    limit: int = Query(
        20,
        ge=1,
        le=100,
        description="Maximum number of results"
    )
):

    # --------------------------------------------------------
    # Check dataset
    # --------------------------------------------------------

    if df.empty:

        return {
            "error": "Dataset is not loaded"
        }


    # --------------------------------------------------------
    # Check district column
    # --------------------------------------------------------

    if "District" not in df.columns:

        return {
            "error": "District column not found"
        }


    # --------------------------------------------------------
    # Copy dataframe
    # --------------------------------------------------------

    results = df.copy()


    # --------------------------------------------------------
    # Filter by district
    # --------------------------------------------------------

    if district:

        district_value = district.strip().lower()

        results = results[
            results["District"]
            .astype(str)
            .str.strip()
            .str.lower()
            == district_value
        ]


    # --------------------------------------------------------
    # Limit results
    # --------------------------------------------------------

    results = results.head(limit)


    # --------------------------------------------------------
    # Convert NaN values
    # --------------------------------------------------------

    results = results.fillna("")


    # --------------------------------------------------------
    # Convert records to JSON
    # --------------------------------------------------------

    records = results.to_dict(
        orient="records"
    )


    return records


# ============================================================
# HOSPITAL SEARCH BY DISTRICT + RATING
# ============================================================

@app.get("/hospitals/top-rated")
def top_rated_hospitals(
    district: str = Query(None),
    limit: int = Query(
        10,
        ge=1,
        le=50
    )
):

    if df.empty:

        return {
            "error": "Dataset is not loaded"
        }


    if "District" not in df.columns:

        return {
            "error": "District column not found"
        }


    results = df.copy()


    # --------------------------------------------------------
    # District filter
    # --------------------------------------------------------

    if district:

        district_value = district.strip().lower()

        results = results[
            results["District"]
            .astype(str)
            .str.strip()
            .str.lower()
            == district_value
        ]


    # --------------------------------------------------------
    # Rating conversion
    # --------------------------------------------------------

    if "Rating" in results.columns:

        results["Rating"] = pd.to_numeric(
            results["Rating"],
            errors="coerce"
        )

        results = results.sort_values(
            by="Rating",
            ascending=False
        )


    # --------------------------------------------------------
    # Limit
    # --------------------------------------------------------

    results = results.head(limit)

    results = results.fillna("")


    return results.to_dict(
        orient="records"
    )


# ============================================================
# SEARCH BY DISTRICT + MINIMUM RATING
# ============================================================

@app.get("/hospitals/recommended")
def recommended_hospitals(
    district: str,
    minimum_rating: float = Query(
        4.0,
        ge=0,
        le=5
    ),
    limit: int = Query(
        10,
        ge=1,
        le=50
    )
):

    if df.empty:

        return {
            "error": "Dataset is not loaded"
        }


    results = df.copy()


    # --------------------------------------------------------
    # District
    # --------------------------------------------------------

    if "District" in results.columns:

        results = results[
            results["District"]
            .astype(str)
            .str.strip()
            .str.lower()
            == district.strip().lower()
        ]


    # --------------------------------------------------------
    # Rating
    # --------------------------------------------------------

    if "Rating" in results.columns:

        results["Rating"] = pd.to_numeric(
            results["Rating"],
            errors="coerce"
        )

        results = results[
            results["Rating"] >= minimum_rating
        ]

        results = results.sort_values(
            by="Rating",
            ascending=False
        )


    # --------------------------------------------------------
    # Limit
    # --------------------------------------------------------

    results = results.head(limit)

    results = results.fillna("")


    return results.to_dict(
        orient="records"
    )


# ============================================================
# DATASET INFORMATION
# ============================================================

@app.get("/dataset/info")
def dataset_info():

    if df.empty:

        return {
            "dataset_loaded": False,
            "records": 0,
            "columns": []
        }


    return {
        "dataset_loaded": True,
        "records": len(df),
        "columns": list(df.columns)
    }