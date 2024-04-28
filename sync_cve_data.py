# sync_cve_data.py

import requests
import json
from pymongo import MongoClient
from datetime import datetime

def fetch_cve_data():
    base_url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    try:
        response = requests.get(base_url)
        if response.status_code == 200:
            print("API connection successful.")
            return response.json().get("vulnerabilities", [])
        else:
            print(f"Failed to fetch data from API. Status code: {response.status_code}")
            return []
    except Exception as e:
        print(f"Error fetching data from API: {e}")
        return []

def sync_cve_to_database(cve_data):
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["securin"]  # Replace with your database name
        cve_collection = db["CVE"]#replace the collection name

        for cve in cve_data:
            cve_id = cve.get("cve", {}).get("CVE_data_meta", {}).get("ID")
            existing_cve = cve_collection.find_one({"cve.CVE_data_meta.ID": cve_id})
            if existing_cve:
                cve["_id"] = existing_cve["_id"]
                cve_collection.replace_one({"_id": existing_cve["_id"]}, cve)
                print(f"Updated CVE {cve_id} in the database.")
            else:
                cve_collection.insert_one(cve)
                print(f"Inserted new CVE {cve_id} into the database.")

        print("CVE data synchronized to the database successfully.")
    except Exception as e:
        print(f"Error syncing CVE data to database: {e}")

def main():
    cve_data = fetch_cve_data()
    if cve_data:
        sync_cve_to_database(cve_data)#replace json file name
    else:
        print("No CVE data fetched. Sync process aborted.")

if __name__ == "__main__":
    main()
