import requests
import json

def fetch_and_save_cve_data():
    base_url = "https://services.nvd.nist.gov/rest/json/cves/2.0"

    try:
        response = requests.get(base_url)
        if response.status_code == 200:
            print("API connection successful.")
            json_data = response.json()

            # Save JSON data to a file
            with open("cve_data.json", "w") as file:
                json.dump(json_data, file, indent=4)

            print("CVE data saved to cve_data.json")
        else:
            print(f"Failed to fetch data from API. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error fetching data from API: {e}")

# Call the function to fetch and save CVE data from the API
fetch_and_save_cve_data()
