function appendCVEId() {
    const idcve = document.getElementById("cveNumber");
    idcve.textContent = data.vulnerabilities[0].cve.id;
}

// Function to append description to the HTML page

function appendDescription() {
    const descriptionElement = document.getElementById("description");
    descriptionElement.textContent = data.vulnerabilities[0].cve.descriptions[0].value; // Assuming there's only one description for simplicity
}

// Function to append CVSS Metrics to the HTML page
function appendCVSSMetrics() {
    const cvssMetric = data.vulnerabilities[0].cve.metrics.cvssMetricV2[0]; // Assuming there's only one metric for simplicity
    document.getElementById("accessVector").textContent = cvssMetric.cvssData.accessVector;
    document.getElementById("score").textContent = cvssMetric.cvssData.baseScore;
    document.getElementById("vectorString").textContent = cvssMetric.cvssData.vectorString;
    // Assuming other properties are available in the cvssMetric.cvssData object
}

// Function to append scores to the HTML page
function appendScores() {
    const cvssMetric = data.vulnerabilities[0].cve.metrics.cvssMetricV2[0]; // Assuming there's only one metric for simplicity
    document.getElementById("exploitabilityScore").textContent = cvssMetric.exploitabilityScore;
    document.getElementById("impactScore").textContent = cvssMetric.impactScore;
    // Assuming other properties are available in the cvssMetric object
}

// Function to append CVSS Metrics table rows to the HTML page
function appendCVSSMetricsTable() {
    const cvssMetricsBody = document.getElementById("cvssMetricsBody");
    data.vulnerabilities[0].cve.metrics.cvssMetricV2.forEach(cvssMetric => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cvssMetric.cvssData.accessVector}</td>
            <td>${cvssMetric.cvssData.accessComplexity}</td>
            <td>${cvssMetric.cvssData.authentication}</td>
            <td>${cvssMetric.cvssData.confidentialityImpact}</td>
            <td>${cvssMetric.cvssData.integrityImpact}</td>
            <td>${cvssMetric.cvssData.availabilityImpact}</td>
        `;
        cvssMetricsBody.appendChild(row);
    });
}

// Function to append CPE table rows to the HTML page
function appendCPETable() {
    const cpeBody = document.getElementById("cpeBody");
    for (let i = 0; i < 3 && i < data.vulnerabilities[0].cve.configurations[0].nodes[0].cpeMatch.length; i++) {
        const cpeMatch = data.vulnerabilities[0].cve.configurations[0].nodes[0].cpeMatch[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cpeMatch.criteria}</td>
            <td>${cpeMatch.matchCriteriaId}</td>
            <td>${cpeMatch.vulnerable}</td>
        `;
        cpeBody.appendChild(row);
    }
}
function displayRows() {
    // Placeholder implementation for displaying rows
}

// Placeholder function for updating pagination buttons
function updatePaginationButtons(totalPages) {
    // Placeholder implementation for updating pagination buttons
}

// Function to calculate total pages based on total rows
function getTotalPages(totalRows) {
    // Implementation for calculating total pages goes here
    // For simplicity, let's assume 1 page for every 10 rows
    return Math.ceil(totalRows / 10);
}
// Fetch data from the API and update HTML accordingly
fetch('http://127.0.0.1:5000/api/cve')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        data = responseData;
        console.log("Data fetched successfully:", data);
        // Call functions to append data to HTML
        appendDescription();
        appendCVEId(); // Call the appendCVEId function here
        appendCVSSMetrics();
        appendScores();
        appendCVSSMetricsTable();
        appendCPETable();
        
        const totalRows = data.vulnerabilities.length;
        const totalPages = getTotalPages(totalRows);
        displayRows();
        updatePaginationButtons(totalPages);
    })
    .catch(error => console.error('Error fetching data:', error));
