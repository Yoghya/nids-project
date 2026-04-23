import os
from datetime import datetime

class DBHandler:
    def __init__(self):
        self.use_mongo = False
        try:
            from pymongo import MongoClient
            # Attempt to connect to local MongoDB
            self.client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=2000)
            self.client.server_info() # trigger exception if not running
            self.db = self.client["nids_db"]
            self.collection = self.db["training_logs"]
            self.use_mongo = True
            print("Connected to MongoDB successfully.")
        except Exception as e:
            print("MongoDB not found. Falling back to TinyDB (local JSON file).")
            from tinydb import TinyDB
            # Ensure db directory exists
            os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
            self.db = TinyDB(os.path.join(os.path.dirname(__file__), 'local_db.json'))
            self.use_mongo = False

    def save_metrics(self, dataset_name, metrics):
        record = {
            "timestamp": datetime.now().isoformat(),
            "dataset": dataset_name,
            "metrics": metrics
        }
        if self.use_mongo:
            self.collection.insert_one(record)
        else:
            self.db.insert(record)

    def get_latest_metrics(self, dataset_name):
        if self.use_mongo:
            result = self.collection.find({"dataset": dataset_name}).sort("timestamp", -1).limit(1)
            results = list(result)
            if results:
                # Remove ObjectId for JSON serialization
                results[0].pop('_id', None)
                return results[0]
            return None
        else:
            from tinydb import Query
            Log = Query()
            results = self.db.search(Log.dataset == dataset_name)
            if results:
                # Get the latest one
                return sorted(results, key=lambda x: x['timestamp'], reverse=True)[0]
            return None

db_handler = DBHandler()
