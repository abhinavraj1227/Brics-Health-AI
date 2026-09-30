from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.api.endpoints import router as api_router

# Create SQLite tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BRICS HealthResilience AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the AI endpoints router
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "Online", "service": "HealthResilience AI Backend (SQLite Mode)"}