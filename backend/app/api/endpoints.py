from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import random
import asyncio
import google.generativeai as genai
from app.ml.predictor import health_ai

# --- GEMINI SETUP ---
GEMINI_API_KEY = "YOUR_API_KEY_HERE" \
""
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-1.5-flash')

router = APIRouter()

# In-memory storage for interactive CRUD recommendations
active_recommendations = [
    {
        "id": "ACTION-001",
        "type": "MEDICINE_TRANSFER",
        "title": "Impending Stock-out",
        "description": "PHC-204 is projected to run out of Amoxicillin in 31 hours.",
        "recommendation": "Move 850 units from PHC-B (Excess inventory detected).",
        "priority": "HIGH",
        "confidence": 0.94
    },
    {
        "id": "ACTION-002",
        "type": "COLD_CHAIN_ALERT",
        "title": "Cold Chain Failure Risk",
        "description": "Vaccine Store 12 shows 82% probability of compressor failure.",
        "recommendation": "Relocate 2,000 vaccine vials to backup facility immediately.",
        "priority": "CRITICAL",
        "confidence": 0.89
    },
    {
        "id": "ACTION-003",
        "type": "ROUTE_REROUTE",
        "title": "Supply Chain Congestion",
        "description": "NH-37 corridor experiencing 4.2 hr freight delay for oxygen tankers.",
        "recommendation": "Reroute transit through bypass corridor beta-4.",
        "priority": "HIGH",
        "confidence": 0.91
    }
]

resolved_actions_count = 0

# --- PHC NETWORK MICRO-INVENTORY DATABASE ---
phc_network_data = [
    {
        "id": "PHC-204",
        "name": "Central District Clinic 204",
        "region": "New Delhi Sector 4",
        "amoxicillin": 120,
        "oxygen_tanks": 8,
        "cold_chain_temp": 4.2,
        "staff_active": 14,
        "status": "CRITICAL"
    },
    {
        "id": "PHC-B",
        "name": "North Suburban Health Hub",
        "region": "New Delhi Rural",
        "amoxicillin": 2400,
        "oxygen_tanks": 35,
        "cold_chain_temp": 3.8,
        "staff_active": 22,
        "status": "NOMINAL"
    },
    {
        "id": "CHP-ALPHA",
        "name": "Community Health Post Alpha",
        "region": "São Paulo West",
        "amoxicillin": 450,
        "oxygen_tanks": 12,
        "cold_chain_temp": 6.5,
        "staff_active": 9,
        "status": "WARNING"
    },
    {
        "id": "PHC-99",
        "name": "Eastern Metro Health Station",
        "region": "Beijing District 2",
        "amoxicillin": 1850,
        "oxygen_tanks": 40,
        "cold_chain_temp": 2.9,
        "staff_active": 30,
        "status": "NOMINAL"
    },
    {
        "id": "PHC-12",
        "name": "Southern Cape Medical Depot",
        "region": "Cape Town Sector 1",
        "amoxicillin": 85,
        "oxygen_tanks": 4,
        "cold_chain_temp": 8.1,
        "status": "CRITICAL"
    }
]

# --- LAST-MILE DRONE & COURIER MISSIONS ---
drone_missions_data = [
    {
        "id": "DRONE-ALPHA-01",
        "destination": "PHC-204 (New Delhi Sector 4)",
        "cargo": "Amoxicillin & Cold-Chain Vaccine Vials",
        "status": "IN_FLIGHT",
        "battery": "84%",
        "eta": "14 mins",
        "speed": "65 km/h",
        "weather": "Moderate Crosswind"
    },
    {
        "id": "DRONE-BETA-03",
        "destination": "CHP-ALPHA (São Paulo West)",
        "cargo": "Type-O Blood Plasma Packets",
        "status": "LANDING",
        "battery": "19%",
        "eta": "Arriving Now",
        "speed": "0 km/h",
        "weather": "Clear"
    },
    {
        "id": "COURIER-GAMMA-02",
        "destination": "PHC-12 (Cape Town Depot)",
        "cargo": "Emergency Antivenom & Insulin",
        "status": "REROUTING_FLOOD",
        "battery": "52%",
        "eta": "42 mins",
        "speed": "45 km/h",
        "weather": "Heavy Rain / Road Blocked"
    },
    {
        "id": "DRONE-DELTA-08",
        "destination": "PHC-99 (Beijing District 2)",
        "cargo": "Emergency Surgical Antiseptics",
        "status": "IN_FLIGHT",
        "battery": "91%",
        "eta": "8 mins",
        "speed": "72 km/h",
        "weather": "Optimal"
    }
]

# --- WEBSOCKET CONNECTION MANAGER ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

manager = ConnectionManager()

@router.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(25)
            spontaneous_alert = {
                "id": f"LIVE-{random.randint(1000, 9999)}",
                "type": "EMERGENCY_BROADCAST",
                "title": "🚨 Live Telemetry Spike Detected",
                "description": "Automated drone sensor array flagged an unexpected pathogen concentration spike.",
                "recommendation": "Immediately dispatch regional reserve stocks and lockdown zone sector.",
                "priority": "CRITICAL",
                "confidence": 0.98
            }
            active_recommendations.append(spontaneous_alert)
            await websocket.send_json(spontaneous_alert)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

class ChatRequest(BaseModel):
    message: str

@router.post("/ai/chat")
def chat_with_gemini(req: ChatRequest):
    try:
        context = f"""
        You are 'Hashira-AI', the assistant for the BRICS HealthResilience Command Center.
        Active Recommendations Count: {len(active_recommendations)}.
        Resolved Interventions: {resolved_actions_count}.
        User Message: {req.message}
        Keep responses concise, military-grade, and focused on healthcare logistics.
        """
        response = gemini_model.generate_content(context)
        return {"reply": response.text}
    except Exception:
        return {"reply": "Neural interface offline. Please configure GEMINI_API_KEY in endpoints.py."}

@router.get("/metrics/summary")
def get_summary_metrics():
    live_infection_rate = random.uniform(30.0, 80.0)
    live_disruption = random.uniform(10.0, 50.0)
    live_temp_anomaly = random.uniform(0.0, 15.0)

    predicted_occupancy = health_ai.predict_occupancy(
        live_infection_rate, live_disruption, live_temp_anomaly
    )

    return {
        "critical_shortages": len(active_recommendations) * 5 + random.randint(1, 4),
        "bed_occupancy_rate": predicted_occupancy,
        "active_outbreak_signals": 2,
        "federated_model_version": "v12.4",
        "node_status": "ONLINE (IND-CENTRAL)",
        "resolved_actions": resolved_actions_count
    }

@router.get("/ai/recommendations")
def get_ai_recommendations():
    return active_recommendations

@router.get("/phc/network")
def get_phc_network():
    return phc_network_data

@router.get("/drones/missions")
def get_drone_missions():
    return drone_missions_data

@router.post("/ai/recommendations/{action_id}/approve")
def approve_recommendation(action_id: str):
    global resolved_actions_count
    target = None
    for item in active_recommendations:
        if item["id"] == action_id:
            target = item
            break

    if not target:
        raise HTTPException(status_code=404, detail="Action not found or already approved.")

    active_recommendations.remove(target)
    resolved_actions_count += 1

    return {
        "success": True,
        "action_id": action_id,
        "message": f"Intervention {action_id} authorized. Logistics network dispatched.",
        "resolved_total": resolved_actions_count
    }

@router.get("/federated/status")
def get_federated_status():
    return {
        "round": 12,
        "global_model_version": "12.4",
        "accuracy_improvement": "+8.7%",
        "countries": [
            {"code": "IND", "name": "India", "samples": 125000, "status": "Uploaded"},
            {"code": "BRA", "name": "Brazil", "samples": 98000, "status": "Uploaded"},
            {"code": "RUS", "name": "Russia", "samples": 76000, "status": "Uploaded"},
            {"code": "CHN", "name": "China", "samples": 210000, "status": "Uploaded"},
            {"code": "ZAF", "name": "South Africa", "samples": 54000, "status": "Training"}
        ],
        "privacy_protection": "Differential Privacy & Secure Aggregation Enabled"
    }