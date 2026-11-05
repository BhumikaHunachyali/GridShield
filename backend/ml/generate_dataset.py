
import numpy as np
import pandas as pd
from pathlib import Path

SEED = 42
SAMPLES_PER_NODE = 1500

rng = np.random.default_rng(SEED)

# Simulated microgrid node baselines
NODES = {
    "G-01": {"type": "generator", "voltage": 1.00, "frequency": 50.00, "load": 72},
    "S-01": {"type": "solar", "voltage": 1.01, "frequency": 50.00, "load": 35},
    "B-01": {"type": "battery", "voltage": 0.99, "frequency": 50.01, "load": 28},
    "N-01": {"type": "substation", "voltage": 1.00, "frequency": 49.99, "load": 61},
    "N-02": {"type": "residential", "voltage": 0.98, "frequency": 50.00, "load": 45},
    "E-01": {"type": "industrial", "voltage": 1.02, "frequency": 50.01, "load": 83},
    "W-01": {"type": "hospital", "voltage": 1.00, "frequency": 50.00, "load": 54},
    "C-01": {"type": "campus", "voltage": 0.99, "frequency": 49.99, "load": 39},
}

NODE_TYPES = list(sorted({node["type"] for node in NODES.values()}))


def generate_sample(node_id, baseline, attack_type):
    """Generate one telemetry sample for a simulated grid node."""

    expected_v = baseline["voltage"]
    expected_f = baseline["frequency"]
    expected_l = baseline["load"]

    # Normal sensor noise
    voltage = expected_v + rng.normal(0, 0.008)
    frequency = expected_f + rng.normal(0, 0.025)
    load = expected_l + rng.normal(0, 2.0)

    if attack_type == "fdi":
        voltage += rng.choice([-1, 1]) * rng.uniform(0.06, 0.22)
        load += rng.choice([-1, 1]) * rng.uniform(8, 25)

    elif attack_type == "gradual_drift":
        voltage += rng.choice([-1, 1]) * rng.uniform(0.025, 0.10)
        frequency += rng.choice([-1, 1]) * rng.uniform(0.05, 0.20)

    elif attack_type == "coordinated":
        voltage += rng.choice([-1, 1]) * rng.uniform(0.10, 0.25)
        frequency += rng.choice([-1, 1]) * rng.uniform(0.10, 0.30)
        load += rng.choice([-1, 1]) * rng.uniform(15, 35)

    voltage_residual = voltage - expected_v
    frequency_residual = frequency - expected_f
    load_residual = load - expected_l

    voltage_deviation_pct = (
        abs(voltage_residual) / expected_v * 100
    )

    return {
        "node_id": node_id,
        "node_type": baseline["type"],
        "voltage": voltage,
        "frequency": frequency,
        "load": load,
        "expected_voltage": expected_v,
        "expected_frequency": expected_f,
        "expected_load": expected_l,
        "voltage_residual": voltage_residual,
        "frequency_residual": frequency_residual,
        "load_residual": load_residual,
        "voltage_deviation_pct": voltage_deviation_pct,
        "attack_type": attack_type,
        "label": int(attack_type != "normal"),
    }


def main():
    rows = []

    attack_types = [
        "normal",
        "fdi",
        "gradual_drift",
        "coordinated",
    ]

    for node_id, baseline in NODES.items():
        for _ in range(SAMPLES_PER_NODE):
            attack_type = rng.choice(attack_types, p=[0.50, 0.25, 0.15, 0.10])
            rows.append(
                generate_sample(node_id, baseline, attack_type)
            )

    df = pd.DataFrame(rows)

    output_path = (
        Path(__file__).resolve().parents[1]
        / "data"
        / "raw"
        / "microgrid_dataset.csv"
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

    print("Dataset generated successfully!")
    print(f"Saved to: {output_path}")
    print(f"Total samples: {len(df)}")
    print("\nClass distribution:")
    print(df["label"].value_counts())
    print("\nAttack distribution:")
    print(df["attack_type"].value_counts())


if __name__ == "__main__":
    main()
