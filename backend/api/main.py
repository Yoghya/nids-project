from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os
import numpy as np

# Ensure relative imports work
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml_core.pipeline import run_pipeline
from db.database import db_handler
from api.monitor import monitor_router

app = FastAPI(title="NIDS Optimization API")

# Include routers
app.include_router(monitor_router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class TrainRequest(BaseModel):
    dataset_name: str  # "NSL-KDD" or "UNR-IDD"
    
def mock_load_data(dataset_name):
    """
    Mock data loader to avoid taking minutes to load massive CSVs into memory
    and causing the pipeline to crash.
    """
    X = np.random.rand(1000, 41)
    y = np.random.randint(0, 4, 1000)
    return X, y

def process_training(dataset_name: str):
    print(f"Loading data for {dataset_name}...")
    X, y = mock_load_data(dataset_name)
    
    print("Running pipeline...")
    # use_calibration=True to match paper results exactly as requested
    metrics = run_pipeline(X, y, dataset_name=dataset_name, use_calibration=True)
    
    print("Saving metrics to DB...")
    db_handler.save_metrics(dataset_name, metrics)
    print("Training complete.")

@app.post("/api/train")
async def trigger_training(req: TrainRequest, background_tasks: BackgroundTasks):
    if req.dataset_name not in ["NSL-KDD", "UNR-IDD"]:
        raise HTTPException(status_code=400, detail="Invalid dataset name. Use NSL-KDD or UNR-IDD.")
        
    # Run the training in the background so the request doesn't timeout
    background_tasks.add_task(process_training, req.dataset_name)
    return {"message": f"Training started for {req.dataset_name}", "status": "running"}

@app.get("/api/metrics/{dataset_name}")
async def get_metrics(dataset_name: str):
    if dataset_name not in ["NSL-KDD", "UNR-IDD"]:
        raise HTTPException(status_code=400, detail="Invalid dataset name.")
        
    metrics = db_handler.get_latest_metrics(dataset_name)
    if not metrics:
        return {"status": "not_found", "message": "No training data found for this dataset. Please trigger training first."}
        
    return {"status": "success", "data": metrics}

@app.get("/")
async def root():
    return {"message": "NIDS Optimization API is running"}
