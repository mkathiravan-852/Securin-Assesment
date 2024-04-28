from flask import Flask, jsonify
from pymongo import MongoClient

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["CSW"]  # MongoDB database name
collection = db["test"]  # MongoDB collection name

@app.route("/api/cve")
def get_cve_data():
    cve_data = list(collection.find({}, {"_id": 0}))  # Retrieve all data from MongoDB
    return jsonify({"vulnerabilities": cve_data})

if __name__ == "__main__":
    app.run(debug=True)




