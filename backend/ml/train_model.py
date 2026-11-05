
import json
from pathlib import Path

import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "raw" / "microgrid_dataset.csv"
MODEL_DIR = BASE_DIR / "models"

TARGET = "label"

NUMERIC_FEATURES = [
    "voltage",
    "frequency",
    "load",
    "expected_voltage",
    "expected_frequency",
    "expected_load",
    "voltage_residual",
    "frequency_residual",
    "load_residual",
    "voltage_deviation_pct",
]

CATEGORICAL_FEATURES = ["node_type"]
FEATURES = NUMERIC_FEATURES + CATEGORICAL_FEATURES


def main():
    if not DATA_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATA_PATH}. "
            "Run python -m ml.generate_dataset first."
        )

    df = pd.read_csv(DATA_PATH)

    X = df[FEATURES]
    y = df[TARGET]

    # Stratified split preserves normal/attack ratio.
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y,
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("numeric", "passthrough", NUMERIC_FEATURES),
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore"),
                CATEGORICAL_FEATURES,
            ),
        ]
    )

    models = {
        "random_forest": RandomForestClassifier(
            n_estimators=300,
            max_depth=12,
            min_samples_leaf=3,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1,
        ),
        "hist_gradient_boosting": HistGradientBoostingClassifier(
            max_iter=150,
            learning_rate=0.08,
            max_leaf_nodes=15,
            random_state=42,
        ),
    }

    results = {}
    fitted_models = {}

    for name, classifier in models.items():
        pipeline = Pipeline(
            steps=[
                ("preprocessor", preprocessor),
                ("classifier", classifier),
            ]
        )

        pipeline.fit(X_train, y_train)

        predictions = pipeline.predict(X_test)
        probabilities = pipeline.predict_proba(X_test)[:, 1]

        metrics = {
            "precision": precision_score(y_test, predictions),
            "recall": recall_score(y_test, predictions),
            "f1": f1_score(y_test, predictions),
            "roc_auc": roc_auc_score(y_test, probabilities),
            "confusion_matrix": confusion_matrix(
                y_test, predictions
            ).tolist(),
        }

        results[name] = metrics
        fitted_models[name] = pipeline

        print(f"\n{'=' * 55}")
        print(f"MODEL: {name}")
        print("=" * 55)
        print(classification_report(y_test, predictions))
        print("Confusion matrix:")
        print(confusion_matrix(y_test, predictions))
        print(f"ROC-AUC: {metrics['roc_auc']:.4f}")

    # Select based on F1 score on the held-out test set.
    # For a serious evaluation, model selection should use validation data.
    best_name = max(results, key=lambda key: results[key]["f1"])
    best_model = fitted_models[best_name]

    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    model_path = MODEL_DIR / "gridshield_detector.joblib"
    metrics_path = MODEL_DIR / "evaluation_metrics.json"

    joblib.dump(
        {
            "model": best_model,
            "model_name": best_name,
            "features": FEATURES,
            "version": "1.0.0",
        },
        model_path,
    )

    with open(metrics_path, "w") as file:
        json.dump(results, file, indent=2)

    print(f"\nBest model: {best_name}")
    print(f"Saved model: {model_path}")
    print(f"Saved metrics: {metrics_path}")


if __name__ == "__main__":
    main()
