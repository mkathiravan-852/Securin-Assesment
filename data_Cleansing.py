def clean_cve_data(cve_data):
    cleaned_data = []  
    seen_ids = set()   
    for cve in cve_data:
    
        if 'CVE_ID' not in cve or cve['CVE_ID'] is None:
            continue 

        cve_id = cve['CVE_ID']
        if cve_id in seen_ids:
            continue 
        else:
            seen_ids.add(cve_id)
        clean_entry = {key: value for key, value in cve.items() if value is not None}
        cleaned_data.append(clean_entry)
    print("Data cleaning process completed.")
    return cleaned_data
cleaned_cve_data = clean_cve_data('cve.json')#your json file name
print("Cleaned CVE data:", cleaned_cve_data)