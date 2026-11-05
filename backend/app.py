
from datetime import datetime, timezone
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(
    title="GRIDSHIELD",
    description="Cyber-physical microgrid defense simulation",
    version="0.1.0",
)

# Local development only. Restrict CORS before deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Entirely simulated microgrid. No real grid/device connections.
GRID_TEMPLATE = {
    "G-01": {"name": "Main Generator", "voltage": 1.00, "frequency": 50.00, "load": 72.0},
    "S-01": {"name": "Solar Farm", "voltage": 1.01, "frequency": 50.00, "load": 35.0},
    "B-01": {"name": "Battery Storage", "voltage": 0.99, "frequency": 50.01, "load": 28.0},
    "N-01": {"name": "North Substation", "voltage": 1.00, "frequency": 49.99, "load": 61.0},
    "N-02": {"name": "North Residential", "voltage": 0.98, "frequency": 50.00, "load": 45.0},
    "E-01": {"name": "East Industrial", "voltage": 1.02, "frequency": 50.01, "load": 83.0},
    "W-01": {"name": "West Hospital", "voltage": 1.00, "frequency": 50.00, "load": 54.0},
    "C-01": {"name": "Campus Feeder", "voltage": 0.99, "frequency": 49.99, "load": 39.0},
}


def timestamp():
    return datetime.now(timezone.utc).isoformat()


def fresh_grid():
    return {
        node_id: {
            **values,
            "expected_voltage": values["voltage"],
            "expected_frequency": values["frequency"],
            "expected_load": values["load"],
            "status": "healthy",
            "compromised": False,
            "isolated": False,
        }
        for node_id, values in GRID_TEMPLATE.items()
    }


state = {
    "running": True,
    "grid": fresh_grid(),
    "incidents": [],
    "timeline": [],
    "last_detection": [],
    "attack_active": False,
}


def log_event(event, details):
    state["timeline"].append({
        "timestamp": timestamp(),
        "event": event,
        "details": details,
    })


class AttackRequest(BaseModel):
    node_ids: List[str] = Field(min_length=1)
    voltage_shift: float = Field(default=0.12, ge=0.03, le=0.30)


class NodeRequest(BaseModel):
    node_ids: List[str] = Field(min_length=1)


@app.get("/api/health")
def health():
    return {
        "status": "online",
        "service": "GRIDSHIELD Simulation Engine",
        "simulation_only": True,
    }


@app.get("/api/grid")
def get_grid():
    return {
        "running": state["running"],
        "nodes": state["grid"],
        "node_count": len(state["grid"]),
        "attack_active": state["attack_active"],
    }


@app.post("/api/simulation/reset")
def reset_simulation():
    state["running"] = True
    state["grid"] = fresh_grid()
    state["incidents"] = []
    state["timeline"] = []
    state["last_detection"] = []
    state["attack_active"] = False

    log_event("SIMULATION_RESET", "Microgrid restored to baseline state.")
    return {"message": "Simulation reset", "grid": state["grid"]}


@app.post("/api/attack")
def launch_attack(request: AttackRequest):
    if state["attack_active"]:
        raise HTTPException(409, "An attack is already active. Mitigate or reset first.")

    for node_id in request.node_ids:
        if node_id not in state["grid"]:
            raise HTTPException(404, f"Unknown node: {node_id}")

    for node_id in request.node_ids:
        node = state["grid"][node_id]
        if node["isolated"]:
            raise HTTPException(409, f"Node {node_id} is isolated.")

        # Alter reported sensor data only, not the simulated physical baseline.
        node["voltage"] = round(
            node["expected_voltage"] + request.voltage_shift, 3
        )
        node["compromised"] = True
        node["status"] = "under_attack"

    state["attack_active"] = True
    incident = {
        "id": f"INC-{len(state['incidents']) + 1:03d}",
        "type": "FALSE_DATA_INJECTION",
        "nodes": request.node_ids,
        "status": "active",
        "created_at": timestamp(),
    }
    state["incidents"].append(incident)

    log_event(
        "FALSE_DATA_INJECTION",
        f"Injected false voltage telemetry into {', '.join(request.node_ids)}.",
    )

    return {
        "message": "Simulated false-data injection launched",
        "incident": incident,
        "grid": state["grid"],
    }


@app.post("/api/detect")
def detect_attack():
    detections = []

    for node_id, node in state["grid"].items():
        voltage_residual = abs(node["voltage"] - node["expected_voltage"])
        frequency_residual = abs(node["frequency"] - node["expected_frequency"])
        load_residual = abs(node["load"] - node["expected_load"])

        # Transparent residual-based detector for this toy simulation.
        score = round(
            voltage_residual / 0.03
            + frequency_residual / 0.10
            + load_residual / 10.0,
            2,
        )
        is_anomaly = score >= 2.0 and not node["isolated"]

        if is_anomaly:
            node["status"] = "compromised"
            detections.append({
                "node_id": node_id,
                "node_name": node["name"],
                "anomaly_score": score,
                "voltage_residual": round(voltage_residual, 3),
                "confidence": min(0.99, round(0.70 + score * 0.05, 2)),
                "reason": "Telemetry deviates from expected operating baseline",
            })

    state["last_detection"] = detections
    log_event(
        "AI_DETECTION",
        f"Detector flagged {len(detections)} anomalous node(s).",
    )

    return {
        "detector": "Residual-based anomaly detector",
        "flagged_count": len(detections),
        "detections": detections,
    }


@app.post("/api/mitigate")
def mitigate(request: NodeRequest):
    for node_id in request.node_ids:
        if node_id not in state["grid"]:
            raise HTTPException(404, f"Unknown node: {node_id}")

    mitigated = []

    for node_id in request.node_ids:
        node = state["grid"][node_id]
        node["isolated"] = True
        node["status"] = "isolated"
        node["compromised"] = False

        # Discard suspect measurements and use baseline values.
        node["voltage"] = node["expected_voltage"]
        node["frequency"] = node["expected_frequency"]
        node["load"] = node["expected_load"]

        mitigated.append(node_id)

    if not any(node["compromised"] for node in state["grid"].values()):
        state["attack_active"] = False

    for incident in state["incidents"]:
        if incident["status"] == "active":
            incident["status"] = "contained"

    log_event("MITIGATION", f"Isolated suspicious nodes: {', '.join(mitigated)}.")

    return {
        "message": "Mitigation complete",
        "isolated_nodes": mitigated,
        "grid": state["grid"],
    }


@app.post("/api/recover")
def recover():
    recovered = []

    for node_id, node in state["grid"].items():
        node["voltage"] = node["expected_voltage"]
        node["frequency"] = node["expected_frequency"]
        node["load"] = node["expected_load"]
        node["compromised"] = False
        node["isolated"] = False
        node["status"] = "healthy"
        recovered.append(node_id)

    state["attack_active"] = False

    for incident in state["incidents"]:
        incident["status"] = "recovered"

    log_event("RECOVERY", "All simulated nodes restored to baseline.")

    return {
        "message": "Grid recovery complete",
        "recovered_nodes": recovered,
        "grid": state["grid"],
    }


@app.get("/api/incidents")
def get_incidents():
    return {"incidents": state["incidents"]}


@app.get("/api/timeline")
def get_timeline():
    return {"timeline": state["timeline"]}
