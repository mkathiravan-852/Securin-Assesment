let rowsPerPage = 10; // Default number of rows per page
let currentPage = 1; // Current page
let data; // Global variable to store fetched data

// Function to calculate total number of pages
function getTotalPages(totalRows) {
  return Math.ceil(totalRows / rowsPerPage);
}

// Function to display rows for the current page
function displayRows() {
  const cveTableBody = document.getElementById('cveTableBody');
  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, data.vulnerabilities.length);
  cveTableBody.innerHTML = ''; // Clear previous rows
  for (let i = start; i < end; i++) {
    const cve = data.vulnerabilities[i];
    const row = document.createElement('tr');
    row.classList.add('clickable');
    row.addEventListener('click', () => {
    window.location.href = `details.html?id=${cve.cve.id}`; // Pass the CVE ID as a query parameter
});
    row.innerHTML = `
      <td>${cve.cve.id}</td>
      <td>${cve.cve.sourceIdentifier}</td>
      <td>${cve.cve.published.split('T')[0]}</td>
      <td>${cve.cve.lastModified.split('T')[0]}</td>
      <td>${cve.cve.vulnStatus}</td>
    `;
    cveTableBody.appendChild(row);
  }
}

// Function to update pagination buttons
function updatePaginationButtons(totalPages) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Clear previous buttons
  const maxPages = Math.min(currentPage + 6, totalPages);
  for (let i = currentPage; i <= maxPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayRows();
      updatePaginationButtons(totalPages);
    });
    if (i === currentPage) {
      button.disabled = true;
      button.style.backgroundColor = '#ddd';
    }
    pagination.appendChild(button);
  }
}

document.getElementById('resultsPerPage').addEventListener('change', function() {
  rowsPerPage = parseInt(this.value);
  const totalRows = data.vulnerabilities.length;
  const totalPages = getTotalPages(totalRows);
  currentPage = 1; // Reset current page
  displayRows();
  updatePaginationButtons(totalPages);
});

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
    const totalRows = data.vulnerabilities.length;
    const totalPages = getTotalPages(totalRows);
    displayRows();
    updatePaginationButtons(totalPages);
  })
  .catch(error => console.error('Error fetching data:', error));
