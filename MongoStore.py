from pymongo import MongoClient
import json

def store_json_data_to_db():
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["CSW"]
    cve_collection = db["test"]

    try:
        # Open the JSON file and load the data
        with open("cve_data.json", "r") as file:
            json_data = json.load(file)

            # Extract CVE entries from the JSON data
            cve_entries = json_data.get("vulnerabilities", [])

            # Insert each CVE entry into the database
            result = cve_collection.insert_many(cve_entries)

            print(f"{len(result.inserted_ids)} documents inserted into the database.")
    except Exception as e:
        print(f"Error storing JSON data to the database: {e}")

# Call the function to store JSON data to the database
store_json_data_to_db()
